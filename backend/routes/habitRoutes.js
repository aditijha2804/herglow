const express = require("express");
const router = express.Router();

const db = require("../db");

// ==============================
// HABIT ROUTES
// ==============================


// Save habits
router.post("/", (req, res) => {

    const {
        user_id,
        date,
        water,
        skincare,
        exercise,
        nutrition,
        self_care
    } = req.body;

    if (!user_id || !date) {
        return res.status(400).json({
            message: "User ID and date are required."
        });
    }

    const sql = `
    INSERT INTO habits
    (user_id, date, water, skincare, exercise, nutrition, self_care)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        water = VALUES(water),
        skincare = VALUES(skincare),
        exercise = VALUES(exercise),
        nutrition = VALUES(nutrition),
        self_care = VALUES(self_care)
`;

    db.query(
        sql,
        [
            user_id,
            date,
            water || false,
            skincare || false,
            exercise || false,
            nutrition || false,
            self_care || false
        ],
        (err, result) => {

            if (err) {
                console.error("Habit save error:", err);

                return res.status(500).json({
                    message: "Failed to save habits."
                });
            }

            res.status(201).json({
                message: "Habits saved successfully!",
                habitId: result.insertId
            });
        }
    );
});
router.get("/:user_id", (req, res) => {

    const userId = req.params.user_id;

    const sql = `
    SELECT
        id,
        user_id,
        DATE_FORMAT(date, '%Y-%m-%d') AS date,
        water,
        skincare,
        exercise,
        nutrition,
        self_care
    FROM habits
    WHERE user_id = ?
    ORDER BY date DESC
`;

    db.query(sql, [userId], (err, results) => {

        if (err) {
            console.error("Habit fetch error:", err);

            return res.status(500).json({
                message: "Failed to fetch habits."
            });
        }

        res.json(results);
    });
});
module.exports = router;