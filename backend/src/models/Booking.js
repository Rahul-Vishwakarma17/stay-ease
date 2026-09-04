import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
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

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;



// property
// property: ObjectId

// Tells us which property was booked.

// guest
// guest: ObjectId

// Tells us who made the booking.

// We'll get this from:

// req.user.userId

// just like we got host when creating a property.

// The frontend won't decide who the guest is.

// checkIn / checkOut

// These are the dates:

// Check-in  → 20 Aug
// Check-out → 23 Aug

// We'll use these later to detect overlapping bookings.

// guests

// How many people are staying:

// guests = 4

// We'll later make sure this doesn't exceed:

// Property.maxGuests
// totalPrice

// We'll calculate this from:

// number of nights × price per night

// For example:

// ₹5,000/night
// 3 nights


// = ₹15,000

// The client shouldn't simply tell our backend:

// {
//   "totalPrice": 1
// }

// We'll calculate it on the backend.

// status

// For now:

// confirmed
// cancelled

// We're deliberately not adding payment status, because we removed the payment gateway from the project scope for now.





// Our booking development plan

// We'll build it in this order:

// 1. Booking Model        ← NOW
//        ↓
// 2. Create Booking
//        ↓
// 3. Calculate total price
//        ↓
// 4. Check property capacity
//        ↓
// 5. Prevent overlapping bookings 🔥
//        ↓
// 6. Get user's bookings
//        ↓
// 7. Cancel booking
//        ↓
// 8. Host sees bookings