import { AuthenticatedRequest } from "./middleware"
import { User } from "./model"
import TryCatch from "./TryCatch"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const registerUser = TryCatch(async (req, res) => {
    const {name, email, password} = req.body
    let user = await User.findOne({ email })

    if (!password) {
        res.status(400).json({
            message: "Password is required"
        });
        return;
    }


    if(user) {
        res.status(400).json({
            message: "User allready exist"
        })
        return
    }

    const hashPassword = await bcrypt.hash(password, 10)

    user = await User.create({
        name,
        email,
        password: hashPassword
    })

    const token = jwt.sign({_id: user._id}, process.env.JWT_SEC as string, {
        expiresIn: "1d"
    })

    res.status(200).json({
        message: "User register success",
        user,
        token
    })

})

export const loginUser = TryCatch(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({ email })

    if(!user) {
        res.status(404).json({
            message: "User not found"
        })

        return
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        res.status(404).json({
            message: "Password is incorrect"
        })

        return
    }

    const token = jwt.sign({_id: user._id}, process.env.JWT_SEC as string, {
        expiresIn: "1d"
    })

    res.status(200).json({
        message: "User login success",
        user,
        token
    })
})

export const myProfile = TryCatch(async (req: AuthenticatedRequest, res) => {
    const user = req.user

    res.json(user)
})