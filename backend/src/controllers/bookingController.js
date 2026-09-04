// Create Booking API

// The flow is:

// Guest
//  ↓
// POST /api/bookings
//  ↓
// protect 🔐
//  ↓
// Find Property
//  ↓
// Validate dates
//  ↓
// Check guest capacity
//  ↓
// Calculate total price
//  ↓
// Save Booking
//  ↓
// MongoDB





// import Booking from "../models/Booking.js";
// import Property from "../models/Property.js";

// export const createBooking = async (req, res) => {
//   try {
//     const {
//       propertyId,
//       checkIn,
//       checkOut,
//       guests,
//     } = req.body;

//     // Basic validation
//     if (!propertyId || !checkIn || !checkOut || !guests) {
//       return res.status(400).json({
//         message: "All booking details are required",
//       });
//     }

//     // Find property
//     const property = await Property.findById(propertyId);

//     if (!property) {
//       return res.status(404).json({
//         message: "Property not found",
//       });
//     }

//     // Check guest capacity
//     if (guests > property.maxGuests) {
//       return res.status(400).json({
//         message: `Maximum ${property.maxGuests} guests allowed`,
//       });
//     }

//     // Convert dates
//     const startDate = new Date(checkIn);
//     const endDate = new Date(checkOut);

//     // Validate dates
//     if (
//       isNaN(startDate.getTime()) ||
//       isNaN(endDate.getTime())
//     ) {
//       return res.status(400).json({
//         message: "Invalid booking dates",
//       });
//     }

//     if (endDate <= startDate) {
//       return res.status(400).json({
//         message: "Check-out must be after check-in",
//       });
//     }

//     // Calculate number of nights
//     const millisecondsPerDay = 1000 * 60 * 60 * 24;

//     const numberOfNights = Math.ceil(
//       (endDate - startDate) / millisecondsPerDay
//     );

//     // Calculate total price
//     const totalPrice =
//       numberOfNights * property.pricePerNight;

//     // Create booking
//     const booking = await Booking.create({
//       property: property._id,
//       guest: req.user.userId,
//       checkIn: startDate,
//       checkOut: endDate,
//       guests,
//       totalPrice,
//     });

//     res.status(201).json({
//       message: "Booking created successfully",
//       booking,
//     });
//   } catch (error) {
//     console.error("Create booking error:", error);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };



// Property
// const property = await Property.findById(propertyId);

// We need the property because we need:

// pricePerNight
// maxGuests
// Guest

// Notice:

// guest: req.user.userId

// We don't accept the guest ID from the frontend.

// The JWT tells us who is logged in.

// JWT
//  ↓
// protect middleware
//  ↓
// req.user.userId
//  ↓
// Booking.guest
// Number of nights

// For example:

// Check-in: 20 Aug
// Check-out: 23 Aug


// = 3 nights

// Then:

// 3 × ₹5000
// = ₹15000

// The backend calculates this.






// so nect thing 
// he next step is the most important booking logic:

// Existing Booking
//        ↓
// Check requested dates
//        ↓
// Overlap?
//    ┌───┴───┐
//   Yes      No
//    ↓        ↓
//   ❌       ✅
// Reject    Allow



// Prevent Double Booking

// Suppose:

// Property: Beach Villa


// Existing booking:
// 10 Sep ───── 13 Sep

// A new guest requests:

// 12 Sep ───── 15 Sep

// These dates overlap ❌, so we must reject the booking.

// But:

// 13 Sep ───── 16 Sep

// is allowed ✅ because the previous guest checks out on the 13th.

// Step 3 — Check Date Overlap

// The overlap rule is surprisingly simple:

// A new booking overlaps an existing booking when:

// existing.checkIn < new.checkOut
//         AND
// existing.checkOut > new.checkIn

// We'll query MongoDB before creating the booking.



import Booking from "../models/Booking.js";
import Property from "../models/Property.js";

export const createBooking = async (req, res) => {
  try {
    const {
      propertyId,
      checkIn,
      checkOut,
      guests,
    } = req.body;

    // Basic validation
    if (!propertyId || !checkIn || !checkOut || !guests) {
      return res.status(400).json({
        message: "All booking details are required",
      });
    }

    // Find property
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Check guest capacity
    if (guests > property.maxGuests) {
      return res.status(400).json({
        message: `Maximum ${property.maxGuests} guests allowed`,
      });
    }

    // Convert dates
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    // Validate dates
    if (
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime())
    ) {
      return res.status(400).json({
        message: "Invalid booking dates",
      });
    }

    if (endDate <= startDate) {
      return res.status(400).json({
        message: "Check-out must be after check-in",
      });
    }


    // Check for overlapping bookings
const overlappingBooking = await Booking.findOne({
  property: property._id,
  status: "confirmed",

  checkIn: {
    $lt: endDate,
  },

  checkOut: {
    $gt: startDate,
  },
});

if (overlappingBooking) {
  return res.status(409).json({
    message: "Property is already booked for these dates",
  });
}

    // Calculate number of nights
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const numberOfNights = Math.ceil(
      (endDate - startDate) / millisecondsPerDay
    );

    // Calculate total price
    const totalPrice =
      numberOfNights * property.pricePerNight;

    // Create booking
    const booking = await Booking.create({
      property: property._id,
      guest: req.user.userId,
      checkIn: startDate,
      checkOut: endDate,
      guests,
      totalPrice,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};



// Guest Booking History

// We want:

// GET /api/bookings/my-bookings

// The important rule is:

// A guest should see only their own bookings.

// We already have the user's ID from JWT:

// req.user.userId

// So the flow is:

// GET /my-bookings
//        ↓
// protect 🔐
//        ↓
// req.user.userId
//        ↓
// Booking.find({ guest: userId })
//        ↓
// Only that user's bookings




export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      guest: req.user.userId,
    })
      .populate("property")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Two important things
// guest: req.user.userId

// This is the security part:

// Booking.find({
//   guest: req.user.userId,
// })

// We're telling MongoDB:

// Give me bookings where the guest is the currently logged-in user.

// So User A cannot get User B's bookings simply by changing an ID in the URL.

// .populate("property")

// Our Booking currently stores:

// property → Property ID

// For example:

// Booking
// ├── property: "66abc..."
// ├── guest: "77xyz..."
// ├── checkIn
// └── checkOut

// With:

// .populate("property")

// Mongoose fetches the actual Property document too.

// So instead of getting only:

// property: "66abc..."

// we can get:

// property:
// {
//    title: "Beautiful Villa",
//    pricePerNight: 5000,
//    images: [...]
// }

// This will be very useful for the frontend booking history page.


export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Check booking ownership
    if (booking.guest.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to cancel this booking",
      });
    }

    // Check booking status
    if (booking.status === "cancelled") {
      return res.status(400).json({
        message: "Booking is already cancelled",
      });
    }

    // Cancel booking
    booking.status = "cancelled";

    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error("Cancel booking error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// We're not deleting the booking from MongoDB.

// Instead:

// confirmed → cancelled

// That's better because we retain the booking history.

// And importantly, our availability query checks:

// status: "confirmed"

// So once cancelled, those dates become available again. ✅






// Host sees bookings

// We want:

// GET /api/bookings/host

// The host should see only bookings made for their own properties.

// Flow
// Host
//  ↓
// GET /api/bookings/host
//  ↓
// protect 🔐
//  ↓
// Find properties owned by host
//  ↓
// Find bookings for those properties
//  ↓
// Return bookings

export const getHostBookings = async (req, res) => {
  try {
    // Find properties owned by the logged-in host
    const properties = await Property.find({
      host: req.user.userId,
    }).select("_id");

    const propertyIds = properties.map((property) => property._id);

    // Find bookings for those properties
    const bookings = await Booking.find({
      property: { $in: propertyIds },
    })
      .populate("property")
      .populate("guest", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get host bookings error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};