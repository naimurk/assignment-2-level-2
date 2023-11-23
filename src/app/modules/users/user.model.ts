import { Schema, model } from "mongoose";
import { TAddress, TOrder, TUser, TUserName} from "./user.interface";

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


 export const UserSchema = new Schema<TUser>({
   userId : {type: String, required: true},
   email: {type: String, required: true , unique: true},
   password: {type: String, required: true },
   fullName: {type: UserNameSchema, required: true},
   address: {type: AddressSchema, required: true},
   age: {type: Number , required: true},
   hobbies: {type: [String] , required: true},
   isActive: {type: Boolean , required: true},
   userName: {type: String, required: true},
   orders: {type: [OrderSchema], required: true}
})

  
  UserSchema.pre("save", async function (next){
   // eslint-disable-next-line @typescript-eslint/no-this-alias
   const user = this;
   user.password = await bcrypt.hash(user.password , Number(config.BCRYPT_SALT_ROUNDS));
   next();

  })

  UserSchema.post("save", async function (doc , next){
    doc.set("password", undefined);
   next()
  })


 export const User = model<TUser>("user", UserSchema)
