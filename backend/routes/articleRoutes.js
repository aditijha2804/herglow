const express = require("express");
const router = express.Router();

const db = require("../db");

// Get all articles
router.get("/", (req, res) => {

    const sql = `
        SELECT id, title, category, description, content, created_at
        FROM articles
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.error("Article fetch error:", err);

            return res.status(500).json({
                message: "Failed to fetch articles."
            });
        }

        res.json(results);
    });
});


// Get one article by ID
router.get("/:id", (req, res) => {

    const articleId = req.params.id;

    const sql = `
        SELECT id, title, category, description, content, created_at
        FROM articles
        WHERE id = ?
    `;

    db.query(sql, [articleId], (err, results) => {

        if (err) {
            console.error("Article fetch error:", err);

            return res.status(500).json({
                message: "Failed to fetch article."
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Article not found."
            });
        }

        res.json(results[0]);
    });
});


module.exports = router;