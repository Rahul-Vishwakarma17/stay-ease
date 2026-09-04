import express from "express";

import {
  createBooking,
  getMyBookings,
  cancelBooking,
  getHostBookings,
} from "../controllers/bookingController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my-bookings", protect, getMyBookings);
router.delete("/:id", protect, cancelBooking);
router.get("/host", protect, getHostBookings);

export default router;