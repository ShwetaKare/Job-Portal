import {Job} from "../models/job.model.js"


//admin or recruiter
export const postJob = async (req, res) =>{
    try{
        const {title , description , requirements , salary , location , jobType , experience , position , companyId} = req.body;
        const userId = req.id;
        if (
            title == null || 
            description == null || 
            requirements == null || 
            salary == null || 
            location == null || 
            jobType == null || 
            experience == null || 
            position == null || 
            companyId == null
        ){
            return res.status(400).json({
                message:"All fields are required",
                success:false
            })
        }
        const job = await Job.create({
            title , description , requirements:requirements.split(",") , salary:Number(salary) , location , jobType , experience, position , company:companyId, created_By:userId
        })
       return res.status(200).json({
            message:"New job created successfully",
            job,
            success:true
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

//student
export const getalljobs = async(req,res) =>{
    try{
        const keyword = req.query.keyword || ""
        const query = {
            $or:[
                {title:{$regex:keyword , $options:"i"}},
                {description:{$regex:keyword , $options:"i"}}
            ]
        }
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1})
        if(!jobs){
            res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }
        res.status(200).json({
            jobs,
            success:true
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

//student
export const getJobById = async (req , res) =>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path :"applications",
            select: "applicant",
        })
        if(!job){
            return res.status(404).json({
                message: "Jobs not found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}

//jobs that the recruiter has posted
export const getAdminJob = async(req,res) =>{
    try{
        const adminid = req.id;
        const jobs = await Job.find({created_By:adminid}).populate({
            path:'company',
            createdAt:-1
        })
        if(!jobs){
        return res.status(400).json({
            message: "Jobs not found",
            success:false
        })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Internal server error",
            success:false
        })
    }
}

