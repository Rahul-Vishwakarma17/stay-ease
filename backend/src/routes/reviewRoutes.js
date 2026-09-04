import express from "express";

import {
  createReview,
  getPropertyReviews,
  getPropertyRating,
} from "../controllers/reviewController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createReview);
router.get("/property/:propertyId", getPropertyReviews);
router.get("/property/:propertyId/rating", getPropertyRating);

export default router;