import { Application } from "../models/application.model.js"
import { Job } from "../models/job.model.js"
import transporter from "../utils/mail.js"

export const applyjob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success: false
            })
        }
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId })
        if (existingApplication) {
            return res.status(400).json({
                message: "Already applied for the job",
                success: false
            })
        }

        //check if job exists
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        //create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        })

        job.applications.push(newApplication._id);
        await job.save()

        const applier = await Application.findOne({ job: jobId, applicant: userId }).populate({
            path: "applicant", // Populate the applicant field
        });
        if (!applier) {
            return res.status(404).json({
                message: "Application not found for this job and user",
                success: false,
            });
        }

        // Access the email of the specific applicant
        const applicantEmail = applier.applicant.email;
        const applicantName = applier.applicant.fullname;
        console.log(applicantEmail)
        console.log(applicantName)
       
        const mailOptions = {
            from: 'shwetakare29@gmail.com',
            to: applicantEmail,
            subject: 'Application Submitted Successfully!',
            text: `Hi ,\n\nThank you for applying for the role of ${job?.title}. 
            We will review your application and get back to you soon.
            \n\nBest regards,\nJobPortal Team`,
        };
        console.log('Sending email to:', applicantEmail);  // Check if email sending logic is triggered

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
            message: "Job applied successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getappliedjobs = async (req, res) => {
    try {
        const userid = req.id;
        const application = await Application.find({ applicant: userid }).sort({ created_By: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } },
            }
        })

        if (!application) {
            return res.status(400).json({
                message: "No Application",
                success: false
            })
        }
        return res.status(200).json({
            application,
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobid = req.params.id;
        const job = await Job.findById(jobid).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        })

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const updatestatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationid = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            })
        }

        const application = await Application.findOne({ _id: applicationid })
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            })
        }

        application.status = status.toLowerCase()
        await application.save()

        return res.status(200).json({
            message: "Status is updated successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}