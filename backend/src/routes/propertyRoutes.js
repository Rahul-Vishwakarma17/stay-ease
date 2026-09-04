import express from "express";

import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  searchProperties,
} from "../controllers/propertyController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"

const router = express.Router();

// router.post("/", protect, createProperty);
router.post(
  "/",
  protect,
  upload.array("images", 5),
  createProperty
);
router.get("/", getProperties);   // all public can see the properties no protection 
router.get("/search", searchProperties); // maken this afterwards but added it btw 
router.get("/:id", getPropertyById); // single proerties 
router.put("/:id", protect, updateProperty);
router.delete("/:id", protect, deleteProperty);

export default router;