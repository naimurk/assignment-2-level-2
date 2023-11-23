import express, { Router } from 'express'
import { userController } from './user.controller';



const router:Router = express.Router();
router.post("/users", userController.userIntoDb)


export const StudentRoutes:Router = router


