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
export const sendVerificationEmail = async (
  email: string,
  code: string,
): Promise<boolean> => {
  const mailOptions = {
    from: `"${process.env.EMAIL_USER_NAME} from E-Commerce Auth 🔒" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Almost there! Let's verify your email address 🚀",
    html: `
        <h1>Welcome to Our E-Commerce!</h1>
        <p>Hello,</p>
        <p>We're excited to have you on board. To get started, please verify your email address by entering the following verification code:</p>
        <h2 style="color:blue;">${code}</h2>
        <p>If you didn’t request this, please ignore this email.</p>
        <p>Best,</p>
        <p>E-Commerce Auth Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return false;
  }
};
