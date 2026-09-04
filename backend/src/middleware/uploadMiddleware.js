import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

export default upload;



// Why memoryStorage()?

// For our project, we don't need to permanently save uploaded images on the backend server.

// Instead:

// Image
//  ↓
// Multer
//  ↓
// Memory
//  ↓
// Cloudinary
//  ↓
// Permanent cloud storage

// So we avoid creating temporary image files in our backend.