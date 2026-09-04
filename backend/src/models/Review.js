import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;


// What does this represent?

// For example:

// Review
// ├── property → Beach Villa
// ├── guest    → Rahul
// ├── rating   → 5
// └── comment  → "Amazing place!"

// So again we have relationships:

// User
//  ↓ writes
// Review
//  ↓ belongs to
// Property
// 🔐 Important rule we'll implement next

// We won't allow someone to review any random property.

// The backend will check:

// Does this user have a booking for this property?
//         ↓
//        Yes → ✅ Can review
//        No  → ❌ Cannot review

// We'll also prevent the same guest from reviewing the same property multiple times.