import { sendotp } from "../resend.mjs";
import { prisma } from "../Prisma/prisma_client.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const signup = async (req,res) => {
    // const hashedpass = await bcrypt.hash(req.body.password, 10)
    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            address: req.body.address
        }
    })
    res.status(200).json({ message: "User created successfully" })
}

const login = async (req,res) => {
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" })
    }
    const token = jwt.sign({ id: user.id,name: user.name ,email:user.email}, process.env.TOKEN_SECRET, { expiresIn: "1h" })
    res.status(200).json({ message: "Login successful", token })
}


const forgetpassword = async (req,res) => {
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    const otp = Math.floor(100000 + Math.random() * 900000)
    const StrOtp = `${otp}`
    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            otp: StrOtp,
            otpcreatedat: new Date(Date.now())
        }
    })
    await sendotp(user.email, StrOtp)
res.json({ message: "OTP sent to email" })
}


const resetpassword = async (req,res) => {
    const email = req.body.email
    const otp = req.body.otp
    const newpassword = req.body.newpassword
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(!user){
        res.status(404).json({ message: "User not found" })
        return
    }
    if(user.otp !== otp){
        res.status(400).json({ message: "Invalid OTP" })
        return
    }
    const otpage = 5;
    if(Date.now() - user.otpcreatedat.getTime() > otpage * 60 * 1000){
        res.status(400).json({ message: "OTP has expired" })
        return
    }
    const hashedpass = await bcrypt.hash(newpassword, 10)
    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            password: hashedpass,
            otp: null,
        }
    })
    res.json({ message: "Password reset successfully" })
}

export { login,signup,forgetpassword,resetpassword }