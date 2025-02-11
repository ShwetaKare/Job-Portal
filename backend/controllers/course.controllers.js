import { Courses } from "../models/course.model.js";
import { Payment } from "../models/payment.model.js";
// import { generatePDF } from "../utils/pdfGenerator.js";
import PDFDocument from "pdfkit";

export const createcourse = async (req, res) => {
    console.log('Request Body:', req.body); // Log the request body to check if data is being received correctly
    console.log('Decoded User ID:', req.id); // Log the decoded user ID from the token to see if it's correct

    try {
        const { title, description, price, duration, startDate, endDate, companyId } = req.body;
        const newCourse = new Courses({
            title,
            description,
            price,
            duration,
            startDate,
            endDate,
            created_By: req.id, // Make sure the `req.id` is set correctly in the middleware
            company: companyId,
        });

        const savedCourse = await newCourse.save();
        console.log('Course Created:', savedCourse); // Log the created course data

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            course: savedCourse
        });
    } catch (error) {
        console.error('Error Creating Course:', error); // Log the error
        res.status(500).json({
            success: false,
            message: "Error creating course",
            error: error.message
        });
    }
};
    

export const getallcourses = async (req, res) => {
    try {
      const keyword = req.query.keyword || "";
      // Search query to filter courses by title or description
      const query = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      };
  
      // Fetch courses with optional company data, sorted by creation date
      const courses = await Courses.find(query)
        .populate({
          path: "company",
        })
        .sort({ createdAt: -1 });
  
      // If no courses found, return a 404 response
      if (!courses || courses.length === 0) {
        return res.status(404).json({
          message: "No courses found",
          success: false,
        });
      }
      // Return the fetched courses
      res.status(200).json({
        courses,
        success: true,
      });
    } catch (error) {
      console.error(error);
  
      // Return a 500 response in case of server error
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
  
//student
export const getCourseById = async (req , res) =>{
    try{
        const courseId = req.params.id;
        const course = await Courses.findById(courseId)
        if(!course){
            return res.status(404).json({
                message: "Course not found",
                success:false
            })
        }
        return res.status(200).json({
            course,
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

export const getAdmincourse = async(req,res) =>{
    try{
        const adminid = req.id;
        const courses = await Courses.find({created_By:adminid}).populate({
            path:'company',
            createdAt:-1
        })
        if(!courses){
        return res.status(400).json({
            message: "Course not found",
            success:false
        })
        }
        return res.status(200).json({
            courses,
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


export const completePayment = async (req, res) => {
  const courseId = req.params.id;
  const { amount, paymentMethod, cardNumber, cardHolderName, expiryMonth, expiryYear,cvv } = req.body;
  const userId = req.id;

  try {
    // Fetch the course details
    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    // Generate a dummy transaction ID
    const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create payment record
    const payment = new Payment({
      userId,
      courseId,
      amount,
      paymentMethod,
      cardNumber,
      cardHolderName,
      expiryMonth,
      expiryYear,
      cvv,
      transactionId,
      status: "Completed",
    });

    await payment.save();

    res.status(200).json({ message: "Payment successful", transactionId });
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ message: "Failed to process payment" });
  }
};

// Generate Payment Receipt (PDF)
export const generateReceipt = async (req, res) => {
  const courseId = req.params.id;

  try {
    const payment = await Payment.findOne({ courseId, status: "Completed" });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found for this course" });
    }

    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const doc = new PDFDocument();
    const receiptBuffer = [];
    doc.on("data", (chunk) => receiptBuffer.push(chunk));
    doc.on("end", () => {
      const pdfData = Buffer.concat(receiptBuffer);
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=receipt-${payment.transactionId}.pdf`,
      });
      res.send(pdfData);
    });

    doc.fontSize(24).font("Helvetica-Bold").text("Payment Receipt", { align: "center" });
    doc.moveDown(1);  // Adds space after the title

    // Transaction Info Section
    doc.fontSize(12).font("Helvetica").text(`Transaction ID: ${payment.transactionId}`, { lineGap: 10 });
    doc.text(`User ID: ${payment.userId}`, { lineGap: 5 });
    doc.text(`Course: ${course.title}`, { lineGap: 5 });
    doc.text(`Amount: $${payment.amount}`, { lineGap: 5 });
    doc.text(`Payment Method: ${payment.paymentMethod}`, { lineGap: 5 });
    doc.text(`Date: ${new Date().toLocaleString()}`, { lineGap: 10 });

    // Horizontal Line for Separation
    doc.moveDown(2);  // Adds some space before the line
    doc.strokeColor('#000000').lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(1);

    // Footer Section
    doc.fontSize(10).text("Thank you for your payment!", { align: "center" });
    doc.text("If you have any questions, please contact support.", { align: "center" });

    doc.end();
  } catch (error) {
    console.error("Error generating receipt:", error);
    res.status(500).json({ message: "Failed to generate receipt" });
  }
};

