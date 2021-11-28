import userModal from "../../models/use.modal"

export const registrationUser = async (email:string,password:string) => {
  const candidate= await userModal.findOne({email})
   if(candidate){
       throw new Error("User with this email is already registered")
   }
       return await userModal.create({email,password})

    }