import express, { Router } from 'express'
import { userController } from './user.controller';



const router:Router = express.Router();

// create user routes
router.post("/users", userController.userIntoDb)


// get all users
router.get("/users", userController.getAllUserControllers)


// get Specific users
router.get("/users/:userId", userController.getSpecificUser )


// update specific users
router.put("/users/:userId" ,userController.updateSpecificUser)

// delete specific users
router.delete("/users/:userId", userController.deleteSpecificUser)

// add order in specific users
router.put("/users/:userId/orders", userController.addOrder)


// get order data by specific user
router.get("/users/:userId/orders", userController.getOrders)

// get all price for specific user
router.get("/users/:userId/orders/total-price",userController.getAllPrice)

export const StudentRoutes:Router = router




