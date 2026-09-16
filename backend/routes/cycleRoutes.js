const express = require("express");
const router = express.Router();

const db = require("../db");

// ==============================
// HER CYCLE ROUTES
// ==============================

// Test route
router.get("/test", (req, res) => {
    res.json({
        message: "Cycle routes are working!"
    });
});

// Save cycle information
router.post("/", (req, res) => {

    const {
        user_id,
        start_date,
        cycle_length,
        period_length
    } = req.body;

    if (!user_id || !start_date) {
        return res.status(400).json({
            message: "User ID and start date are required."
        });
    }

    const sql = `
        INSERT INTO cycles
        (user_id, start_date, cycle_length, period_length)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user_id,
            start_date,
            cycle_length || 28,
            period_length || 5
        ],
        (err, result) => {

            if (err) {
                console.error("Cycle save error:", err);

                return res.status(500).json({
                    message: "Failed to save cycle information."
                });
            }

            res.status(201).json({
                message: "Cycle information saved successfully!",
                cycleId: result.insertId
            });
        }
    );
});
router.get("/:user_id", (req, res) => {

    const userId = req.params.user_id;

    const sql = `
        SELECT *
        FROM cycles
        WHERE user_id = ?
        ORDER BY created_at DESC
    `;

    db.query(sql, [userId], (err, results) => {

        if (err) {
            console.error("Cycle fetch error:", err);

            return res.status(500).json({
                message: "Failed to fetch cycle information."
            });
        }

        res.json(results);
    });
});
module.exports = router;
