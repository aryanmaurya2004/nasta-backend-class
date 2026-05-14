import express from 'express';
const usersRouter = express.Router();
import { signup, login,forgetpassword,resetpassword} from './controller.mjs';


usersRouter.post("/signup", signup)
usersRouter.post("/login", login)
usersRouter.patch("/forgetpassword", forgetpassword)
usersRouter.patch("/resetpassword", resetpassword)
export { usersRouter }