import mongoose from "mongoose"

const UserSchema=new mongoose.Schema({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    status:{type:Boolean, default:true}
})

export default mongoose.model('User',UserSchema)