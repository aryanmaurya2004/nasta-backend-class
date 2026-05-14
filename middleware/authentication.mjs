import jwt from "jsonwebtoken";
const authentication = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({message:"no token supplied login again"})
    }
    const token = req.headers.authorization.replace("Bearer ", "")
    const output = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = output;
    next();
}
export { authentication }