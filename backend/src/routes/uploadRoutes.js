import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadImage } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), uploadImage);

export default router;


// This line is worth understanding:

// router.post("/", protect, upload.single("image"), uploadImage);

// The request passes through three stages:

// Request
//    ↓
// protect
//    ↓
// upload.single("image")
//    ↓
// uploadImage
// protect

// Checks:

// Is the user logged in?

// upload.single("image")

// Checks:

// Is there a file with the field name image?

// and puts it into:

// req.file
// uploadImage

// Actually sends it to Cloudinary.