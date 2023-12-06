import { Schema, model } from "mongoose";
import { TAddress, TOrder, TUser, TUserName, UserModel, } from "./user.interface";

import bcrypt from "bcrypt"
import config from "../../config";


 export const UserNameSchema = new Schema<TUserName> ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})

export const AddressSchema = new Schema<TAddress>({
    street: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true}
})


export const OrderSchema = new Schema<TOrder>({
    productName: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true}
})


 export const UserSchema = new Schema<TUser,UserModel >({
   userId : {type: Number, required: true , unique: true},
   email: {type: String, required: true , unique: true},
   password: {type: String, required: true },
   fullName: {type: UserNameSchema, required: true},
   address: {type: AddressSchema, required: true},
   age: {type: Number , required: true},
   hobbies: {type: [String] , required: true},
   isActive: {type: Boolean , required: true},
   username: {type: String, required: true},
   orders: {type: [OrderSchema], default:[]}
})

  
  UserSchema.pre("save", async function (next){
   // eslint-disable-next-line @typescript-eslint/no-this-alias
   const user = this;
   
   if (isNaN(user.userId)) {
     throw new Error ("Id must be a number")
   }
   user.password = await bcrypt.hash(user.password , Number(config.BCRYPT_SALT_ROUNDS));
   next();

  })

  UserSchema.post("save", async function (doc , next){
    doc.set("password", undefined);
    doc.set("orders", undefined)
   next()
  })



  
  // statics methods for get specific user 
//   UserSchema.statics.isUserExists =async function (id: string){
//   const existingUser = await User.findOne({userId: id, password: {$exists: true}})
//   if(existingUser === null || !existingUser) return false
//   return true


// }
  // statics methods for get specific user 
  UserSchema.statics.isUserIdAndEmailExist =async function (id: string ,email?: string){
   if(id &&email) {
    const existingUser = await User.findOne({userId: id, email: email,password: {$exists: true}})
    if(existingUser === null || !existingUser) return false
    return true
   }
   
   if(id){
    const existingUser = await User.findOne({userId: id ,password: {$exists: true}})
    if(existingUser === null || !existingUser) return false
    return true
   }


  }





 export const User = model<TUser, UserModel>("user", UserSchema)
