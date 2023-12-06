import { TOrder } from './user.interface';
import { Request, Response } from "express";
import { OrderSchemaZod, UserSchemaZod, UserUpdateSchemaZod } from "./user.validation";
import { userService } from "./userService";


// insert a new user into db controller
const userIntoDb = async (req: Request, res: Response) => {
  try {
    const  userData  = req.body;
    const zodData = UserSchemaZod.parse(userData);
    const result = await userService.createUserIntoDb(zodData);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    // console.log(error)
    res.status(404).json({
      success: false,
      message: error.message || null,
      //
      error: {
        code: 404,
        description: error?.message || null
    }
    });
  }
};

// get all user controllers
const getAllUserControllers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUser();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    res.status(404).json({
      success: false,
      message: error.message || null,
      //
      error: {
        code: 404,
        description: error?.message || null
    }
    });
  }
};

// get specific user
const getSpecificUser = async (req: Request, res: Response) => {
  try {
  
    const id = req.params.userId;
    // console.log(typeof id)
    
    const result = await userService.getSpecificUser(id);
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,

    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    res.status(404).json({
      success: false,
      message: error.message || null,
      //
      error: {
        code: 404,
        description: error?.message || null
    }
    });
  }
};

//  update specific user 
const updateSpecificUser = async(req: Request, res: Response)=> {
  try {
    // console.log(req.params)
    const id = req.params.userId;
    const userData= req.body
    const zodData = UserUpdateSchemaZod.parse(userData);

    const result = await userService.updateSpecificUser(id, zodData);
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    res.status(404).json({
      success: false,
      message: error.message || null,
      //
      error: {
        code: 404,
        description: error?.message || null
    }
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
      data: null,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    res.status(404).json({
      success: false,
      message: error.message || null,
      //
      error: {
        code: 404,
        description: error?.message || null
    }
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
    message: "order created successfully",
    data: null,
  });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (error:any) {
  res.status(404).json({
    success: false,
    message: error.message || null,
    //
    error: {
      code: 404,
      description: error?.message || null
  }
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
      message: "Order fetched successfully!",
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    res.status(404).json({
      success: false,
      message: error.message || null,
      //
      error: {
        code: 404,
        description: error?.message || null
    }
    });
  }
}

const getAllPrice = async ( req: Request, res:Response)=> {
  try {
    // console.log(req.params)
    const id = req.params.userId;
    const result = await userService.getAllPrice(id);
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    res.status(404).json({
      success: false,
      message: error.message || null,
      //
      error: {
        code: 404,
        description: error?.message || null
    }
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
  getOrders,
  getAllPrice
};
