import { Request, Response } from "express";
import { UserSchemaZod } from "./user.validation";
import { userService } from "./userService";

// insert a new user into db controller
const userIntoDb = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const zodData = UserSchemaZod.parse(userData);
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

export const userController = {
  userIntoDb,
  getAllUserControllers,
  getSpecificUser,
  deleteSpecificUser
};
