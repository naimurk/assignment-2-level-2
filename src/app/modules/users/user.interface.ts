

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