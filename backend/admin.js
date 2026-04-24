const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/auth");

router.get("/dashboard", verifyToken, isAdmin, (req, res) =>{
    res.json({ message: "Welcome Admin 🔐"});
});