import nodemailer from 'nodemailer'

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'shwetakare29@gmail.com', 
    pass: 'tboa gpwj tiwj aasv'   
  }
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error with email transporter:', error);
  } else {
    console.log('Email transporter is ready to send messages');
  }
});

export default transporter;