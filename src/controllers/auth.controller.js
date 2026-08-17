import jwt from "jsonwebtoken";
import { prisma } from "../server.js";

const JWT_SECRET = process.env.JWT_SECRET || "civic-secure-jwt-secret-key";
const otpCache = new Map();

export const requestOTP = async (req, res) => {
  try {
    const phone = req.body.phone ? String(req.body.phone).trim() : null;

    if (!phone) {
      return res
        .status(400)
        .json({ status: "error", message: "Phone number is required." });
    }

    const otp = "123456";
    otpCache.set(phone, otp);

    console.log(`📲 [SMS MOCK] Verification OTP for ${phone} is: ${otp}`);
    console.log(`Current Active Cache:`, Array.from(otpCache.entries()));

    return res.status(200).json({
      status: "success",
      message: "OTP sent successfully. Check console for test OTP.",
    });
  } catch (error) {
    console.error("Error in requestOTP:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error." });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const phone = req.body.phone ? String(req.body.phone).trim() : null;
    const otp = req.body.otp ? String(req.body.otp).trim() : null;

    if (!phone || !otp) {
      return res
        .status(400)
        .json({ status: "error", message: "Phone and OTP are required." });
    }

    const cachedOTP = otpCache.get(phone);

    // Fallback allowing test OTP '123456' or cached value
    if (cachedOTP !== otp && otp !== "123456") {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid or expired OTP." });
    }

    otpCache.delete(phone);

    // Find or create citizen record in PostgreSQL
    let user = await prisma.user.findFirst({ where: { phone } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          phone,
          role: "CITIZEN",
        },
      });
      console.log(`👤 New Citizen registered: ${phone}`);
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      status: "success",
      message: "Authentication successful.",
      token,
      user,
    });
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error." });
  }
};
