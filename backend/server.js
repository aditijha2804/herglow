require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./db");
const authRoutes = require("./routes/authRoutes");

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