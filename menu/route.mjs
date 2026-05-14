import { Router } from "express";
import jwt from "jsonwebtoken";

const menuRouter = Router();
import{createMenu, getMenu, updateMenu, deleteMenu}from "./controller.mjs"
import { authentication } from "../middleware/authentication.mjs";


menuRouter.get("/get", getMenu)


menuRouter.use(authentication);


menuRouter.post("/create", createMenu)
menuRouter.patch("/update", updateMenu)
menuRouter.delete("/delete", deleteMenu)

export { menuRouter }