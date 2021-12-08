import userModal from "../../models/use.modal";
import { HttpError } from "../../service/helpers";
import jwt from "jsonwebtoken";
import tokenModal from "../../models/token.modal";
import bcrypt from "bcrypt";

export const loginUser = async (email: string, password: string) => {
  const user = await userModal.findOne({ email });
  if (!user) {
    throw new HttpError("Invalid authorization data");
  }
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    throw new HttpError("Invalid authorization data");
  }
  const userData = await userDto(user);
  const token = generateToken(userData);
  await saveToken(userData.id, token.refreshToken);
  return {
    user: userData,
    ...token,
  };
};

export const registrationUser = async (email: string, password: string) => {
  const candidate = await userModal.findOne({ email });
  if (candidate) {
    throw new HttpError("User with this email is already registered");
  }
  const hashPassword = await bcrypt.hash(password, 3);
  const user = await userModal.create({ email, password: hashPassword });
  const userData = await userDto(user);
  const token = generateToken(userData);
  await saveToken(userData.id, token.refreshToken);
  return {
    user: userData,
    ...token,
  };
};

export const logoutUser = async (refreshToken: string) =>
  await removeToken(refreshToken);

export const refreshTokenUser = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new HttpError("Unauthorized", 401);
  }
  const isValidToken = await validateRefreshToken(refreshToken);
  const dataBaseToken = await findToken(refreshToken);

  if (!isValidToken || !dataBaseToken) {
    throw new HttpError("Unauthorized", 401);
  }
  // @ts-ignore
  const user = await userModal.findById(isValidToken.id);
  const userData = await userDto(user);
  const token = generateToken(userData);
  await saveToken(userData.id, token.refreshToken);
  return {
    user: userData,
    ...token,
  };
};

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SUCCESS_SECRET, {
    expiresIn: "24h",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return { accessToken, refreshToken };
};

const saveToken = async (id: string, refreshToken: string) => {
  const tokenData = await tokenModal.findOne({ user: id });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  return await tokenModal.create({ user: id, refreshToken });
};

const removeToken = async (token: string) =>
  await tokenModal.deleteOne({ token });

const findToken = async (token: string) => await tokenModal.findOne({ token });

const validateRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (e) {
    return "";
  }
};

const validateSuccessToken = (token: string) => {
  try {
    const dd = jwt.verify(token, process.env.JWT_SUCCESS_SECRET);
    if (typeof dd === "string") {
      return dd;
    } else {
      return "";
    }
  } catch (e) {
    return null;
  }
};

const userDto = async (user) => {
  return {
    email: user.email,
    id: user._id,
    status: user.status,
    role: user.role,
  };
};
