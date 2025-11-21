const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { protect } = require("../middleware/authMiddleware");
const docController = require("../controllers/documentController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname;
    cb(null, unique);
  },
});

const upload = multer({ storage });

// všetky routes používajú protect middleware
router.get("/", protect, docController.getDocuments);
router.post("/", protect, upload.single("file"), docController.createDocument);
router.put("/:id", protect, docController.updateDocument);
router.delete("/:id", protect, docController.deleteDocument);
router.get("/:id/download", protect, docController.downloadDocument);

module.exports = router;
