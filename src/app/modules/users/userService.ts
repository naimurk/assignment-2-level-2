import { TOrder, TUser } from "./user.interface";
import { User } from "./user.model";

// insert a new user in db Service
const createUserIntoDb = async (userData: TUser) => {
  
  const result = await User.isUserExists(userData.userId, userData.email);
  if(result){
    throw new Error(`User  already exists)`)
  }
    const user = new User(userData);
    const data = await user.save();
    return data;

};

// geAllUser
const getAllUser = async () => {

    const result = await User.find({})
      .select({ userName: 1, fullName: 1, age: 1, email: 1, address: 1 })
      .exec();
    return result;

};

// get specific user

const getSpecificUser = async (id: string) => {
  
    // const result = await User.findOne({ userId: id, password: {$exists: true} });
    const result = await User.isUserExists(id);

    if (!result || result === null) {
      throw new Error("user not found");
    }

    return await User.findOne({ userId: id },{email:1, fullName:1, address:1, userName:1, userId:1,age:1,hobbies:1});
 
};



// specific user update
const updateSpecificUser = async (id: string, updateData: TUser) => {
  
    const { userName, address, age, email, fullName, hobbies, isActive } =
      updateData;

    // console.log(updateData)

    const user = await User.isUserExists(id);

    if (!user || user === null) {
      // console.log("usr not found")
      throw new Error("user not found");
    }

    const result = await User.updateOne(
      { userId: id },
      {
        $set: {
          userName: userName,
          "address.street": address.street,
          "address.country": address.country,
          "address.city": address.city,
          age: age,
          email: email,
          "fullName.firstName": fullName.firstName,
          "fullName.lastName": fullName.lastName,
          isActive: isActive,
        },
        $addToSet: { hobbies: hobbies },
      }
    );
    if (result.modifiedCount === 1) {
      return await User.findOne({ userId: id },{email:1, fullName:1, address:1, userName:1, userId:1,age:1,hobbies:1});
    }
    else{
      throw new Error("not modified");
    }
   
  } 


// delete specific user
const deleteSpecificUser = async (id: string) => {
  
    // const result = await User.findOne({ userId: id, password: {$exists: true} });
    const result = await User.isUserExists(id);

    if (!result || result === null) {
      throw new Error("user not found");
    }

    return await User.deleteOne({ userId: id });
  
};

// add new order
const addOrder = async (id: string, orderData: TOrder) => {
  
   
    const result = await User.isUserExists(id);

    if (!result || result === null) {
      throw new Error("user not fount");
    }

    return await User.updateOne(
      { userId: id },
      {
        $push: {
          orders: {
            productName: orderData.productName,
            price: orderData.price,
            quantity: orderData.quantity,
          },
        },
      }
    );
   
};

// get order a specific user
const getOrder = async (id: string) => {
  
    // const result = await User.findOne({ userId: id, password: {$exists: true} });
    const result = await User.isUserExists(id);

    if (!result || result === null) {
      throw new Error("user not found");
    }

    return await User.findOne({ userId: id }, { orders: 1 , _id: 0 });

};

// get all price for specified user order
const getAllPrice = async (id: string) => {
  const result = await User.isUserExists(id);

  if (!result || result === null) {
    throw new Error("user not found");
  }

  return await User.aggregate([
    { $match: { userId: id } },
    { $unwind: "$orders" },
    {
      $project: {
        productName: 1,
        price: 1,
        quantity: 1,
        totalPrice: { $multiply: ["$orders.price", "$orders.quantity"] },
      },
    },
    {
      $group: { _id: "userId", totalPrice: { $sum: "$totalPrice" } },
    },
    {$project: {_id: 0}}
  ]);
};

export const userService = {
  createUserIntoDb,
  getAllUser,
  getSpecificUser,
  updateSpecificUser,
  deleteSpecificUser,
  addOrder,
  getOrder,
  getAllPrice
};
