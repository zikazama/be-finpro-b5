const { cashierModel } = require("../models");
const { hashPassword, comparePassword } = require("../lib/hashPassword");
const { authSchema } = require("../lib/validation/auth.schema");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

const login = async (req, res) => {
  const { error } = authSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }

  const cashier = await cashierModel.findOne({
    where: { username: req.body.username },
  });

  if (
    !cashier ||
    !(await comparePassword(req.body.password, cashier.password))
  ) {
    return res
      .status(401)
      .json({ status: "error", message: "Username or password not match!" });
  }

  const token = jwt.sign(
    {
      id: cashier.id,
      uuid: cashier.uuid,
      username: cashier.username,
      email: cashier.email,
      role: "CASHIER",
      image_profile: cashier.image_profile,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.status(200).json({
    status: "success",
    message: "Login berhasil!",
    data: {
      token,
    },
  });
};

const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validate required fields
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "error",
        message:
          "All fields are required: username, email, password, confirmPassword",
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "Password and confirm password do not match",
      });
    }

    // Check if username or email already exists
    const existingCashier = await cashierModel.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if (existingCashier) {
      return res.status(409).json({
        status: "error",
        message: "Username or email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new cashier
    const newCashier = await cashierModel.create({
      uuid: uuidv4(),
      username,
      email,
      password: hashedPassword,
      status: "active",
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(201).json({
      status: "success",
      message: "Registration successful!",
      data: {
        uuid: newCashier.uuid,
        username: newCashier.username,
        email: newCashier.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const checkEmailExists = async (req, res) => {
  const cashier = await cashierModel.findOne({
    where: { email: req.body.email },
  });
  return res.status(200).json({
    status: "success",
    data: cashier ? { exists: true } : { exists: false },
  });
};

const resetPassword = async (req, res) => {
  const cashier = await cashierModel.findOne({ where: { email: req.body.email } });
  if (!cashier) {
    throw new Error("Email not found");
  }

  const hashedPassword = await hashPassword(req.body.newPassword);
  cashier.password = hashedPassword;
  await cashier.save();
  return res.status(200).json({
    status: "success",
    message: "Password reset successful",
  });
};

module.exports = { login, register, checkEmailExists, resetPassword };
