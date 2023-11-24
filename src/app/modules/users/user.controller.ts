import { TOrder, TUser } from './user.interface';
import { Request, Response } from "express";
import { OrderSchemaZod, UserSchemaZod } from "./user.validation";
import { userService } from "./userService";

// insert a new user into db controller
const userIntoDb = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const zodData = UserSchemaZod.parse({...userData, orders:[]});
    const result = await userService.createUserIntoDb(zodData);

    res.status(200).json({
      success: true,
      message: "successfully created",
      data: result,
    });
  } catch (error) {
    // console.log(error)
    res.status(500).json({
      success: false,
      message: "something went wrong",
      //
      error: error,
    });
  }
};

// get all user controllers
const getAllUserControllers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUser();
    res.status(200).json({
      success: true,
      message: "successfully fetched all user controllers",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      //
      error: error,
    });
  }
};

// get specific user
const getSpecificUser = async (req: Request, res: Response) => {
  try {
    // console.log(req.params)
    const id = req.params.userId;
    const result = await userService.getSpecificUser(id);
    res.status(200).json({
      success: true,
      message: "successfully fetched all user controllers",
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      //
      error: error.message,
    });
  }
};

//  update specific user 
const updateSpecificUser = async(req: Request, res: Response)=> {
  try {
    // console.log(req.params)
    const id = req.params.userId;
    const {user:userData}= req.body
    const zodData = UserSchemaZod.parse(userData);

    const result = await userService.updateSpecificUser(id, zodData);
    res.status(200).json({
      success: true,
      message: "successfully updated",
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      //
      error: error.message,
    });
  }
}

// delete specific user
const deleteSpecificUser = async(req:Request, res:Response) => {
  try {
    // console.log(req.params)
    const id = req.params.userId;
    const result = await userService.deleteSpecificUser(id);
    res.status(200).json({
      success: true,
      message: "successfully deleted",
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      //
      error: error.message,
    });
  }
}


// add new order

const addOrder = async (req:Request, res:Response) => {
try {
  const data:TOrder = req.body
  const id = req.params.userId;
  const zodData = OrderSchemaZod.parse(data);
  const result = await userService.addOrder(id, zodData);
  res.status(200).json({
    success: true,
    message: "successfully add order",
    data: result,
  });
} catch (error:any) {
  res.status(500).json({
    success: false,
    message: "something went wrong",
    //
    error: error.message,
  });
}

}


// get specific users orders
const getOrders = async (req: Request, res: Response) => {
  try {
    // console.log(req.params)
    const id = req.params.userId;
    const result = await userService.getOrder(id);
    res.status(200).json({
      success: true,
      message: "successfully fetched all user controllers",
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      //
      error: error.message,
    });
  }
}





export const userController = {
  userIntoDb,
  getAllUserControllers,
  getSpecificUser,
  deleteSpecificUser,
  updateSpecificUser,
  addOrder,
  getOrders
};
