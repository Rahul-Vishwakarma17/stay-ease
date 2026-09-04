import Review from "../models/Review.js";
import Booking from "../models/Booking.js";

export const createReview = async (req, res) => {
  try {
    const { propertyId, rating, comment } = req.body;

    // Basic validation
    if (!propertyId || !rating || !comment) {
      return res.status(400).json({
        message: "Property, rating and comment are required",
      });
    }

    // Check if user has a booking for this property
    const booking = await Booking.findOne({
      property: propertyId,
      guest: req.user.userId,
      status: "confirmed",
    });

    if (!booking) {
      return res.status(403).json({
        message: "You can review only properties you have booked",
      });
    }

    // Check if user already reviewed this property
    const existingReview = await Review.findOne({
      property: propertyId,
      guest: req.user.userId,
    });

    if (existingReview) {
      return res.status(409).json({
        message: "You have already reviewed this property",
      });
    }

    // Create review
    const review = await Review.create({
      property: propertyId,
      guest: req.user.userId,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    console.error("Create review error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};



// What's happening?

// The interesting part is:

// const booking = await Booking.findOne({
//   property: propertyId,
//   guest: req.user.userId,
//   status: "confirmed",
// });

// We're asking MongoDB:

// Does this logged-in user have a confirmed booking for this property?

// If no:

// ❌ Cannot review

// If yes:

// ✅ Continue

// Then we check:

// const existingReview = await Review.findOne({
//   property: propertyId,
//   guest: req.user.userId,
// });

// This prevents:

// Rahul → Beach Villa → Review #1 ✅
// Rahul → Beach Villa → Review #2 ❌






export const getPropertyReviews = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const reviews = await Review.find({
      property: propertyId,
    })
      .populate("guest", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Get property reviews error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};








export const getPropertyRating = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const reviews = await Review.find({
      property: propertyId,
    });

    if (reviews.length === 0) {
      return res.status(200).json({
        averageRating: 0,
        totalReviews: 0,
      });
    }

    const totalRating = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    const averageRating = totalRating / reviews.length;

    res.status(200).json({
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews: reviews.length,
    });
  } catch (error) {
    console.error("Get property rating error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};