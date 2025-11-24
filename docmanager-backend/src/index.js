require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// create uploads if not exists
const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log("Uploads folder created ✔️");
}

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
