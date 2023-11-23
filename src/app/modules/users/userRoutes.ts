import express, { Router } from 'express'
import { userController } from './user.controller';



const router:Router = express.Router();

// create user routes
router.post("/users", userController.userIntoDb)


// get all users
router.get("/users", userController.getAllUserControllers)

export const StudentRoutes:Router = router


