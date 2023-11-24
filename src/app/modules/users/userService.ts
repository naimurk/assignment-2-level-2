import { TOrder, TUser } from "./user.interface";
import { User } from "./user.model";

// insert a new user in db Service
const createUserIntoDb = async (userData: TUser) => {
  try {
    const user = new User(userData);
    const result = await user.save();
    return result;
  } catch (error) {
    console.log(error);
  }
};

// geAllUser
const getAllUser = async () => {
  try {
    const result = await User.find({})
      .select({ userName: 1, fullName: 1, age: 1, email: 1, address: 1 })
      .exec();
    return result;
  } catch (error) {
    console.log(error);
  }
};

// get specific user

const getSpecificUser = async (id: string) => {
  try {
    // const result = await User.findOne({ userId: id, password: {$exists: true} });
    const result = await User.isUserExists(id);

    if (!result || result === null) {
      throw new Error("user does not exist");
    }

    return await User.findOne({ userId: id });
  } catch (error) {
    // console.log(error);
    // Handle the error appropriately
    throw new Error("Failed to get specific user");
  }
};

// specific user update
const updateSpecificUser = async (id: string, updateData: TUser) => {
  try {
    const { userName, address, age, email, fullName, hobbies, isActive } =
      updateData;

    // console.log(updateData)

    const user = await User.isUserExists(id);

    if (!user || user === null) {
      // console.log("usr not found")
      throw new Error("user does not exist");
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
      return await User.findOne({ userId: id });
    }
    // return result

    // console.log(result)
  } catch (error) {
    // console.log(error)
    throw new Error("cant updated");
  }
};

// delete specific user
const deleteSpecificUser = async (id: string) => {
  try {
    // const result = await User.findOne({ userId: id, password: {$exists: true} });
    const result = await User.isUserExists(id);

    if (!result || result === null) {
      throw new Error("user does not exist");
    }

    return await User.deleteOne({ userId: id });
  } catch (error) {
    // console.log(error);
    // Handle the error appropriately
    throw new Error("Failed to get specific user");
  }
};

// add new order
const addOrder = async (id: string, orderData: TOrder) => {
  try {
    // const result = await User.findOne({ userId: id, password: {$exists: true} });
    const result = await User.isUserExists(id);

    if (!result || result === null) {
      throw new Error("user does not exist");
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
  } catch (error) {
    throw new Error();
  }
};

// get order a specific user
const getOrder = async (id: string) => {
  try {
    // const result = await User.findOne({ userId: id, password: {$exists: true} });
    const result = await User.isUserExists(id);

    if (!result || result === null) {
      throw new Error("user does not exist");
    }

    return await User.findOne({ userId: id }, { orders: 1 });
  } catch (error) {
    // console.log(error);
    // Handle the error appropriately
    throw new Error("Failed to get specific user");
  }
};

// get all price for specified user order
const getAllPrice = async (id: string) => {
  const result = await User.isUserExists(id);

  if (!result || result === null) {
    throw new Error("user nai");
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
