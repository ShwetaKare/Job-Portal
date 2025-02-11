import PDFDocument from "pdfkit";
import fs from "fs";

export const generatePDF = (data) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    // Pipe the document to a buffer
    const buffers = [];
    doc.on("data", (buffer) => buffers.push(buffer));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    // Write content to the PDF
    doc.fontSize(18).text("Payment Receipt", { align: "center" });
    doc.fontSize(12).text(`Transaction ID: ${data.transactionId}`);
    doc.text(`Course: ${data.courseName}`);
    doc.text(`Amount Paid: $${data.amount}`);
    doc.text(`User ID: ${data.userId}`);

    // Finalize the PDF and end the stream
    doc.end();
  });
};
