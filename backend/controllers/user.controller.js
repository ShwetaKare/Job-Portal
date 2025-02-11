import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js"
import transporter from "../utils/mail.js"

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            })
        }

        const file =req.file
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilephoto:cloudResponse.secure_url
            }
        })
       

    // Send the welcome email after user creation
    const mailOptions = {
      from: 'shwetakare29@gmail.com',
      to: email,
      subject: 'Welcome to JobPortal!',
      text: `Hi ${fullname},\n\nWelcome to JobPortal. We're excited to have you on board!`,
    };

    console.log('Sending email to:', email);  // Check if email sending logic is triggered
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({
          message: "Error sending welcome email",
          success: false
        });
      }
      console.log('Email sent:', info.response);
    });

    return res.status(200).json({
      message: "Account created successfully and welcome email sent",
      success: true,
    });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error",
            success: true
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            })
        }
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        //check role is correct or not 
        if (role != user.role) {
            return res.status(400).json({
                message: "Account does not exists with current role",
                success: false
            })
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSize: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const updateprofile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body
        const file = req.file

        //cloudinary
        if (file.mimetype !== 'application/pdf') {
            return res.status(400).json({
                message: 'Only PDF files are allowed.',
                success: false,
            });
        }
        const fileUri =getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        console.log("Cloudinary Response:", cloudResponse);       


        let skillsArray
        if (skills) {
            skillsArray = skills.split(",")
        }
        const userId = req.id
        let user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            })
        }

        //updating data
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        //resume comes here
        if(cloudResponse){
            user.profile.resume =cloudResponse.secure_url  //save the cloudinary url
            console.log(user?.profile?.resume);  // Log the resume URL to check if it's valid

            user.profile.resumeOriginalName = file.originalname // save using ig file name
        }

        await user.save()
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error",
            error: error.message  // Log specific error details
        })
    }
}