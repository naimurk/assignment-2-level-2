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
router.put("/users/:userId")

export const StudentRoutes:Router = router


