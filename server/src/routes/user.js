const router = require("express").Router();
const register = require("../utils/register");
const { login, loginLimitter } = require("../utils/login");
const profile = require("../utils/profile");
const account = require("../utils/accountmanagement");
const password = require("../utils/passwordmanagement");
const authenticateToken = require("../../middleware/authMiddleware");
const deleteAccount = require("../utils/delete");

router.post("/api/auth/signup", register);
router.post("/api/auth/login", loginLimitter, login);
router.get("/profile", authenticateToken, profile);
router.put("/profile/update", authenticateToken, account);
router.put("/profile/update/password", authenticateToken, password);
router.delete("/profile/delete", authenticateToken, deleteAccount);

module.exports = router;
