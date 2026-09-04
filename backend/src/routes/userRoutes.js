import express from "express";

import {
  getProfile,
  updateProfile,
  getHostProperties,
  getHostStats,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.get("/host/properties", protect, getHostProperties);
router.get("/host/stats", protect, getHostStats);

export default router;