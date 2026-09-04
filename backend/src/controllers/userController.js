import User from "../models/User.js";
import Property from "../models/Property.js";
import Booking from "../models/Booking.js";


// Get My Profile

// We already have the user's identity from JWT:

// JWT
//  ↓
// protect
//  ↓
// req.user.userId
//  ↓
// User

// We want:

// GET /api/users/profile

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Important part
// .select("-password")

// means:

// Get the user, but do not send the password back.

// Even though the password is hashed, we should never expose it through an API response.




export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Why are we updating the existing document?

// We first find the logged-in user:

// User.findById(req.user.userId)

// Then modify:

// name
// email

// and:

// await user.save();

// updates MongoDB.



// Important

// We're deliberately taking the user ID from:

// req.user.userId

// not from the request body.

// So a user cannot say:

// {
//   "userId": "someone-elses-id"
// }

// and modify another person's profile.



//in detaill 


// The problem

// Imagine there are two users:

// User A
// _id = 111
// name = Rahul


// User B
// _id = 222
// name = Amit

// User A is logged in.

// If our API allowed this:

// {
//   "userId": "222",
//   "name": "Rahul"
// }

// then User A could tell the backend:

// "Update user 222."

// If the backend blindly trusted userId from the request body, User A could modify Amit's profile. ❌

// 🔐 What we do instead

// When User A logs in, we give them a JWT.

// The JWT contains their identity:

// JWT
//  ↓
// userId = 111

// When they make a request:

// PUT /api/users/profile

// the protect middleware verifies the JWT:

// Request
//    ↓
// JWT
//    ↓
// protect middleware
//    ↓
// verify JWT
//    ↓
// req.user.userId = 111

// So our controller does:

// const user = await User.findById(req.user.userId);

// That means:

// "Don't tell me which user to modify. I'll get the identity from the authenticated session/token."



export const getHostProperties = async (req, res) => {
  try {
    const properties = await User.findById(req.user.userId)
      .select("_id")
      .then(async (user) => {
        if (!user) return null;

        return await Property.find({
          host: user._id,
        }).sort({ createdAt: -1 });
      });

    if (!properties) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error("Get host properties error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// What are we doing?

// The JWT gives us:

// req.user.userId

// Then we find:

// Properties where:


// property.host === logged-in user's ID

// So:

// Host Rahul
//    ↓
// req.user.userId
//    ↓
// Property.find({ host: Rahul })
//    ↓
// Only Rahul's properties

// This will power the dashboard's:

// 🏠 My Properties









// We'll use the Property and Booking models to calculate everything.

// Before I give you the code, the logic is:

// Logged-in Host
//       ↓
// req.user.userId
//       ↓
// Find my properties
//       ↓
// Count properties
//       ↓
// Find bookings for those properties
//       ↓
// Count bookings
//       ↓
// Add totalPrice of bookings
//       ↓
// Return statistics





// What we're calculating

// If the host owns:

// 3 properties

// and those properties have:

// Booking 1 → ₹10,000
// Booking 2 → ₹15,000
// Booking 3 → ₹8,000

// the API returns:

// {
//   "totalProperties": 3,
//   "totalBookings": 3,
//   "totalEarnings": 33000
// }
// ⚠️ Important

// We're counting only:

// status: "confirmed"

// So a cancelled booking doesn't contribute to the host's current earnings.



export const getHostStats = async (req, res) => {
  try {
    // Find properties owned by the logged-in host
    const properties = await Property.find({
      host: req.user.userId,
    }).select("_id");

    const propertyIds = properties.map((property) => property._id);

    // Find bookings for host's properties
    const bookings = await Booking.find({
      property: { $in: propertyIds },
      status: "confirmed",
    });

    // Calculate total earnings
    const totalEarnings = bookings.reduce(
      (total, booking) => total + booking.totalPrice,
      0
    );

    res.status(200).json({
      totalProperties: properties.length,
      totalBookings: bookings.length,
      totalEarnings,
    });
  } catch (error) {
    console.error("Get host stats error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};