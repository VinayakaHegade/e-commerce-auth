import nodemailer from "nodemailer";

// Configure the email transporter with your email service credentials
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  service: process.env.EMAIL_SERVICE,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends a verification email to the provided email address with the given code
 * @param email - The email address to send the verification code to
 * @param code - The verification code to include in the email
 */
export const sendVerificationEmail = async (email: string, code: string): Promise<boolean> => {
  const mailOptions = {
    from: `"${process.env.EMAIL_USER_NAME}" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email address for E-Commerce Auth",
    html: `
      <h1>Welcome to Our E-Commerce!</h1>
      <p>Hello,</p>
      <p>We're excited to have you join us. To get started, please verify your email address by entering this verification code:</p>
      <h2 style="color: #4a90e2; background-color: #f0f8ff; padding: 10px; display: inline-block;">${code}</h2>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <p>Best regards,</p>
      <p>The E-Commerce Auth Team</p>
  `,
  };

  try {
    // Verify the connection configuration
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error("Error verifying transporter:", error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    // Send the email
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Error sending verification email:", err);
          reject(err);
        } else {
          console.log("Verification email sent:", info);
          resolve(info);
        }
      });
    });

    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return false;
  }
};
