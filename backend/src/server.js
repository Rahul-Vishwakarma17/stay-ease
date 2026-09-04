// import app from "./app.js";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";

// dotenv.config();

// const PORT = process.env.PORT || 5000;

// connectDB();

// app.listen(PORT, () => {
//   console.log(`StayEase server running on port ${PORT}`);
// });


// images url was not provided o we increse the prioity od dotnev 

import dotenv from "dotenv";

dotenv.config();

const { default: app } = await import("./app.js");
const { default: connectDB } = await import("./config/db.js");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`StayEase server running on port ${PORT}`); 
});