import { Company } from "../models/company.model.js"
import cloudinary from "../utils/cloudinary.js"
import getDataUri from "../utils/datauri.js"

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: true
            })
        }

        let company = await Company.findOne({ name: companyName })
        if (company) {
            return res.status(400).json({
                message: "You can't register same company",
                success: false
            })
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        })

        return res.status(200).json({
            message: "Company registered successfullly",
            company,
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;    // logged-in user ID
        if (!userId) {
            return res.status(400).json({
                message: "User not authenticated",
                success: false
            });
        }

        const companies = await Company.find({ userId });

        // Check if companies array is empty
        if (companies.length === 0) {
            return res.status(404).json({
                message: "No companies found",
                success: false
            });
        }

        return res.status(200).json({
            companies, 
            success: true
        });

    } catch (error) {
        console.log('Error fetching companies:', error);  // Log the error for debugging
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const getCompanybyID = async (req, res) => {
    try {
        const companyid = req.params.id;
        const company = await Company.findById(companyid)
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const updatecompany = async (req, res) => {
    try {
    
        const { id } = req.params;

        // Validate ObjectId

        const { name, description, website, location } = req.body
        const file = req.file
        //cloudinary
        const fileuri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileuri.content)
        const logo = cloudResponse.secure_url


        const updatedata = { name, description, website, location,logo }
        const company = await Company.findByIdAndUpdate(id, updatedata, { new: true })
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company information updated",
            success: true
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}