// emailUtils.ts
import nodemailer from "nodemailer";

// Configure the email transporter with your email service credentials
const transporter = nodemailer.createTransport({
  // ... your email service configuration
});

/**
 * Sends a verification email to the provided email address with the given code
 * @param email - The email address to send the verification code to
 * @param code - The verification code to include in the email
 */
export const sendVerificationEmail = async (email: string, code: string) => {
  const mailOptions = {
    from: "your-email@example.com",
    to: email,
    subject: "Verify your email address",
    text: `Your verification code is: ${code}`,
    // You can also use HTML templates for better email formatting
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};
