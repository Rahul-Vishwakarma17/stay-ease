import Property from "../models/Property.js";
import { uploadToCloudinary } from "../services/cloudinaryService.js";

export const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      maxGuests,
      bedrooms,
      bathrooms,
      category,
      amenities,
    } = req.body;

    // Basic validation
    if (
      !title ||
      !description ||
      !location?.city ||
      !location?.country ||
      pricePerNight === undefined ||
      !maxGuests ||
      !bedrooms ||
      !bathrooms ||
      !category
    ) {
      return res.status(400).json({
        message: "Please provide all required property details",
      });
    }

    // Upload images to Cloudinary
    const imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);

        imageUrls.push(result.secure_url);
      }
    }

    // Create property
    const property = await Property.create({
      title,
      description,
      location,
      pricePerNight,
      maxGuests,
      bedrooms,
      bathrooms,
      category,
      amenities: amenities
  ? amenities.split(",").map((item) => item.trim())
  : [],
      images: imageUrls,
      host: req.user.userId,
    });

    res.status(201).json({
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    console.error("Create property error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error("Get properties error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json({
      property,
    });
  } catch (error) {
    console.error("Get property error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// So the next logical step is Update Property.

// But there's one important thing we'll handle here:

// Only the host who owns a property should be able to edit it. 🔐

// That will combine the two concepts we've already learned:

// JWT Authentication
//         +
// Property.host
//         ↓
// Ownership Authorization



// Update Property

// The flow will be:

// PUT /api/properties/:id
//         ↓
// protect middleware 🔒
//         ↓
// Find property
//         ↓
// Check ownership
//         ↓
// Update property
//         ↓
// MongoDB

// The important new concept is authorization:

// Being logged in doesn't automatically mean you can edit every property. You must also own that property.


export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Check property ownership
    if (property.host.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to update this property",
      });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("Update property error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};



// Delete Property

// The flow is:

// DELETE /api/properties/:id
//           ↓
//    protect middleware 🔒
//           ↓
//     Find property
//           ↓
//    Check ownership
//           ↓
//        Delete
//           ↓
//       MongoDB



export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Check property ownership
    if (property.host.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to delete this property",
      });
    }

    await Property.findByIdAndDelete(id);

    res.status(200).json({
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Delete property error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};



// Let's move to Search & Filtering 🔎

// We want one flexible endpoint rather than separate APIs for city, price, guests, etc.

// Target API
// GET /api/properties/search

// It should eventually support:

// ?city=Vapi
// &minPrice=2000
// &maxPrice=6000
// &guests=4
// &bedrooms=2
// &category=Villa
// &sort=price_asc

// So the flow becomes:

// Frontend
//    ↓
// Search / Filters
//    ↓
// GET /api/properties/search
//    ↓
// Build MongoDB query
//    ↓
// Matching properties


export const searchProperties = async (req, res) => {
  try {
          const {
        city,
        minPrice,
        maxPrice,
        guests,
        bedrooms,
        category,
        sort,
      } = req.query;

          const filter = {};

          // City
          if (city) {
            filter["location.city"] = {
              $regex: city,
              $options: "i",
            };
          }

          // Price
          if (minPrice || maxPrice) {
            filter.pricePerNight = {};

            if (minPrice) {
              filter.pricePerNight.$gte = Number(minPrice);
            }

            if (maxPrice) {
              filter.pricePerNight.$lte = Number(maxPrice);
            }
          }


          // Guests
      if (guests) {
        filter.maxGuests = {
          $gte: Number(guests),
        };
      }

      // Bedrooms
      if (bedrooms) {
        filter.bedrooms = {
          $gte: Number(bedrooms),
        };
      }


      // Category
      if (category) {
        filter.category = {
          $regex: category,
          $options: "i",
        };
      }





      let sortOption = {};

      if (sort === "price_asc") {
        sortOption.pricePerNight = 1;
      } else if (sort === "price_desc") {
        sortOption.pricePerNight = -1;
      } else if (sort === "newest") {
        sortOption.createdAt = -1;
      }



    // const properties = await Property.find(filter);
    const properties = await Property.find(filter).sort(sortOption);  //after sorting change this 

    res.status(200).json({
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error("Search properties error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// req.query

// If the URL is:

// GET /api/properties/search?city=Vapi

// then:

// req.query.city

// is:

// Vapi

// We then build:

// filter["location.city"]

// because our property looks like:

// location: {
//   city: "Vapi",
//   country: "India"
// }

// And:

// $regex

// with:

// $options: "i"

// makes the search case-insensitive.

// So:

// vapi
// Vapi
// VAPI

// can all match.