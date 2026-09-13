const express = require("express");
const router = express.Router();

console.log("Auth routes loaded!");

const db = require("../db");

// ==============================
// REGISTER
// ==============================

router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please fill in all fields."
        });
    }

    const sql = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error("Registration error:", err);

            return res.status(500).json({
                message: "Registration failed."
            });
        }

        res.status(201).json({
            message: "Registration successful!",
            userId: result.insertId
        });
    });
});


// ==============================
// LOGIN
// ==============================

router.post("/login", (req, res) => {
    
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please enter email and password."
        });
    }

    const sql = `
        SELECT id, name, email
        FROM users
        WHERE email = ? AND password = ?
    `;

    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error("Login error:", err);

            return res.status(500).json({
                message: "Login failed."
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const user = results[0];

        res.json({
            message: "Login successful!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    });
});


module.exports = router;