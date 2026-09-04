import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized. Token required.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized. Invalid or expired token.",
    });
  }
};


// req.user = decoded; 

// the req.user contains this 

// {
//   userId: user._id,
//   role: user.role
// }

// further used by PropertyController 
// // Comes from authenticated user
//       host: req.user.userId,


// So after authentication:

// req.user.userId
//       ↓
// User's MongoDB ID

// Therefore:

// host: req.user.userId

// automatically connects the property to the person who created it.