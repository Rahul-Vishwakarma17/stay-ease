

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