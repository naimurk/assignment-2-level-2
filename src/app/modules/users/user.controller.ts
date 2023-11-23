import { Request, Response } from "express";
import { UserSchemaZod } from "./user.validation";
import { userService } from "./userService";

const userIntoDb = async(req: Request , res: Response)=> {
  try {
    const {user: userData} = req.body;
    const zodData = UserSchemaZod.parse(userData);
    const result = await userService.createUserIntoDb(zodData) 
    res.status(500).json({
        success: true,
        message: "successfully created",
        data: result
    })
  } catch (error) {
    // console.log(error)
    res.status(200).json({
        success: false,
        message: "successfully created",
        // 
        error: error
    })
  }
}


export const userController = {
    userIntoDb
} 