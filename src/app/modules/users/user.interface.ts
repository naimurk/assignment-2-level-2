import { Model } from "mongoose";


export type TOrder = {
    productName: string;
    price: number;
    quantity: number;
}

export type TAddress = {
    street: string;
    city: string;
    country: string;

};

export type TUserName = {
    firstName: string;
    lastName: string
}
export type TUser = {
    userId : string;
    userName : string;
    password: string;
    fullName: TUserName
    age: number;
    email: string;
    isActive: true | false;
    hobbies: Array<string>;
    address : TAddress
    orders: Array<TOrder>;

}


// for instance
// export type UserMethods = {
//     isUserExists(passId: string): Promise<TUser | null>
//   }
  
//   // for instance
//   export type UserModel = Model<
//   TUser,
//   Record<string, never>,
//   UserMethods
//   >

export interface UserModel extends Model<TUser> {
    isUserExists(userId: string): Promise<TUser | null>
  }
  