
import { TOrder, TUser } from "./user.interface";
import { User } from "./user.model";

// insert a new user in db Service
const createUserIntoDb = async (userData: TUser) => {
  
  const result = await User.isUserIdAndEmailExist(userData.userId, userData.email);
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
    const exist = await User.isUserIdAndEmailExist(id);

    if (!exist || exist === null) {
      throw new Error("user not found");
    }

  const result = await User.findOne({ userId: id },{password: 0 , orders: 0});
  return result
};



// specific user update
const updateSpecificUser = async (id: string, updateData: Partial<TUser>) => {
  
    const { username, address, age, email, fullName, hobbies, isActive } =
      updateData;

    // console.log(updateData)

    const user = await User.isUserIdAndEmailExist(id);

    if (!user || user === null) {
      // console.log("usr not found")
      throw new Error("user not found");
    }

  
    const result = await User.updateOne(
      { userId: id },
      {
        $set: {
          userName: username,
          "address.street": address && address.street,
          "address.country": address && address.country,
          "address.city": address && address.city,
          age: age,
          email: email,
          "fullName.firstName": fullName &&  fullName.firstName,
          "fullName.lastName": fullName&& fullName.lastName,
          isActive: isActive,
        },
        $addToSet: { hobbies: hobbies },
      }
      // updateData,{new: true}
    );
  
    if ( result.modifiedCount === 1) {
      return await User.findOne({ userId: id },{password: 0 , orders: 0});
    }
    else{
      throw new Error("not modified");
    }
   
  } 


// delete specific user
const deleteSpecificUser = async (id: string) => {
  
    // const result = await User.findOne({ userId: id, password: {$exists: true} });
    const result = await User.isUserIdAndEmailExist(id);

    if (!result || result === null) {
      throw new Error("user not found");
    }

    return await User.deleteOne({ userId: id });
  
};

// add new order
const addOrder = async (id: string, orderData: TOrder) => {
  
   
    const result = await User.isUserIdAndEmailExist(id);

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
    const result = await User.isUserIdAndEmailExist(id);

    if (!result || result === null) {
      throw new Error("user not found");
    }

    return await User.findOne({ userId: id }, { orders: 1 , _id: 0 });

};



const getAllPrice = async (id: string) => {
  const result = await User.isUserIdAndEmailExist(id);
  if (!result || result === null) {
    throw new Error("user not found");
  }
  

  const orderData = await User.findOne({userId: Number(id)})

  if( orderData &&  orderData?.orders.length> 0){
    const data = await User.aggregate([
      { $match: { userId: Number(id) } },
      { $unwind: "$orders" },
      {
        $project: {
          productName: "$orders.productName",
          price: "$orders.price",
          quantity: "$orders.quantity",
          totalPrice: { $multiply: ["$orders.price", "$orders.quantity"] },
        },
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$totalPrice" },
        },
      },
      {
        $project: {
          _id: 0,
          totalPrice: 1
          
        },
      },
      
    ])
  
    return data.length> 0 ? data[0]: {} 
  }

  else {
    throw new Error ("you don't have order information")
  }

 
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
