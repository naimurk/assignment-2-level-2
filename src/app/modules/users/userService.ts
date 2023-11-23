
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

// geAllUser
const getAllUser = async ()=> {
  try {
    const result = await User.find({}).select({userName: 1 , fullName: 1 , age: 1 , email: 1 , address: 1}).exec();
    return result
  } catch (error) {
     console.log(error)
  }
}


// get specific user

const getSpecificUser = async (id: string) => {
  try {
    // const result = await User.findOne({ userId: id, password: {$exists: true} });
     const result = await User.isUserExists(id)

    if(!result || result === null){
      throw new Error ("user does not exist")
    }

    return await User.findOne({ userId: id})

  } catch (error) {
    // console.log(error);
    // Handle the error appropriately
    throw new Error("Failed to get specific user");
  }
};


// specific user update
const updateSpecificUser = async (updateData: TUser)=> {
  try {
    const {}
     
  } catch (error) {
    console.log(error)
  }
}


// delete specific user
const deleteSpecificUser = async (id: string) => {
  try {
    // const result = await User.findOne({ userId: id, password: {$exists: true} });
     const result = await User.isUserExists(id)

    if(!result || result === null){
      throw new Error ("user does not exist")
    }

    return await User.deleteOne({ userId: id})

  } catch (error) {
    // console.log(error);
    // Handle the error appropriately
    throw new Error("Failed to get specific user");
  }
}

export const userService = {
    createUserIntoDb,
    getAllUser,
    getSpecificUser,
    // updateSpecificUser
    deleteSpecificUser
}