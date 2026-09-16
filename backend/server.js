require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./db");
const authRoutes = require("./routes/authRoutes");
const cycleRoutes = require("./routes/cycleRoutes");
const habitRoutes = require("./routes/habitRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

const PORT = process.env.PORT || 5000;


// ==============================
// MIDDLEWARE
// ==============================

app.use(cors());

app.use(express.json());


// ==============================
// API ROUTES
// ==============================

app.use("/api/auth", authRoutes);
app.use("/api/cycle", cycleRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/articles", articleRoutes);


// ==============================
// TEST ROUTE
// ==============================

app.get("/", (req, res) => {
    res.json({
        message: "HerGlow backend is running!"
    });
});


// ==============================
// START SERVER
// ==============================

app.listen(PORT, () => {
    console.log(`HerGlow server running on http://localhost:${PORT}`);
});