import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    description :{
        type:String,
    },
    website :{
        type:String,
        
    },
    location :{
        type:String,
       
    },
    logo:{
        type:String //url for company logo
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Courses',
        
    }
} ,
 { timestamps: true })

export const Company = mongoose.model("Company" , companySchema)