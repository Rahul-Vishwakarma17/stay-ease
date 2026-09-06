//  Create a reusable Cloudinary upload helper

// Right now the Cloudinary upload logic is sitting inside uploadController.js.

// Since we'll need it again for properties, let's avoid copying the same code.

// Create:

// backend/src/services/cloudinaryService.js

import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "stay-ease",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

