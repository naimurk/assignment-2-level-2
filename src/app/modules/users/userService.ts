import { TUser } from "./user.interface";
import { User } from "./user.model";



const createUserIntoDb = async (userData:TUser)=> {
    try {
        const result = await User.create(userData)
        return result
    } catch (error) {
        console.log(error)
    }
}


export const userService = {
    createUserIntoDb
}