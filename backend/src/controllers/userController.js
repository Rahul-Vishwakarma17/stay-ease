import User from "../models/User.js";
import Property from "../models/Property.js";
import Booking from "../models/Booking.js";


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