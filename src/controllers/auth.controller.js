const {
  login,
  register,
  checkEmailExists,
  resetPassword,
} = require("../services/auth.service");

const authController = {
  login: async (req, res) => {
    try {
      return await login(req, res);
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  },
  register: async (req, res) => {
    try {
      return await register(req, res);
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  },
  checkEmailExists: async (req, res) => {
    try {
      return await checkEmailExists(req, res);
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      return await resetPassword(req, res);
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  },
};

module.exports = authController;
