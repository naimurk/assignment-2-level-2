import { Model } from "mongoose";


export type TOrder = {
    productName: string;
    price: number;
    quantity: number;
}

export type TAddress  = {
    street: string;
    city: string;
    country: string;

};

export type TUserName = {
    firstName: string;
    lastName: string
}
export type TUser = {
    userId : number;
    username : string;
    password: string;
    fullName: TUserName
    age: number;
    email: string;
    isActive: boolean;
    hobbies: Array<string>;
    address : TAddress
    orders: Array<TOrder> | [];

}




export interface UserModel extends Model<TUser> {
    isUserIdAndEmailExist(userId: string | number, email?:string): Promise<TUser | null>
  }
  