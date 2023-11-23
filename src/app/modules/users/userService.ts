import { TUser } from "./user.interface";
import { User } from "./user.model";


// insert a new user in db Service
const createUserIntoDb = async (userData:TUser)=> {
    try {
        const user = new User(userData)
        const result = await user.save();
        return result
    } catch (error) {
        console.log(error)
    }
}


const getAllUser = async ()=> {
  try {
    const result = await User.find({}).select({userName: 1 , fullName: 1 , age: 1 , email: 1 , address: 1}).exec();
    return result
  } catch (error) {
     console.log(error)
  }
}


export const userService = {
    createUserIntoDb,
    getAllUser
}