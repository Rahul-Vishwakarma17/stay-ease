import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  // Restore user when application starts
  useEffect(() => {
    const restoreUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/users/profile");

        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to restore user:", error);

        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, [token]);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("token", token);

    setToken(token);
    setUser(user);

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}




// 1. AuthContext.jsx — Global Login State

// Think of AuthContext as a central authentication box for the whole React application.

//                 AuthContext
//                     │
//        ┌────────────┼────────────┐
//        ↓            ↓            ↓
//     Navbar       Booking      Dashboard

// Instead of each component separately asking:

// "Is the user logged in?"

// they can simply access the AuthContext.

// What does it store?
// user
// token
// login()
// logout()
// user

// Stores information about the currently logged-in user.

// Example:

// {
//   name: "Rahul",
//   email: "...",
//   role: "guest"
// }

// So Navbar can later say:

// Welcome Rahul

// or show:

// My Dashboard
// Logout
// token

// Stores the JWT in React state.

// The JWT is also saved in:

// localStorage

// so refreshing the page doesn't immediately remove the token.

// login()

// This function is basically:

// email + password
//        ↓
// POST /auth/login
//        ↓
// Backend
//        ↓
// JWT + user
//        ↓
// Save JWT
//        ↓
// Update React state

// Later our Login.jsx will simply call:

// login(email, password)

// It doesn't need to know all the JWT details.

// logout()

// Does the opposite:

// Logout
//  ↓
// Remove JWT
//  ↓
// Remove user
//  ↓
// User is logged out
// 2. useAuth() — How Components Access It

// We created:

// useAuth()

// This is just a convenient way for any component to access the authentication context.

// For example, later:

// Navbar
//  ↓
// useAuth()
//  ↓
// user
//  ↓
// Show "Rahul"

// Or:

// Booking
//  ↓
// useAuth()
//  ↓
// Is user logged in?
//  ↓
// Allow booking

// Or:

// Host Dashboard
//  ↓
// useAuth()
//  ↓
// user.role
//  ↓
// Host?
// 3. AuthProvider — Makes Auth Available Everywhere

// In main.jsx we wrapped:

// <AuthProvider>
//     <App />
// </AuthProvider>

// This basically says:

// "Every component inside my application can access authentication information."


// AuthProvider
//       │
//       └── App
//            │
//            ├── Navbar
//            ├── Home
//            ├── Login
//            ├── PropertyDetails
//            ├── GuestDashboard
//            └── HostDashboard

//            All of them can use:

// useAuth()



// Real example

// Suppose Rahul logs in.

// Login
//  ↓
// Backend
//  ↓
// JWT
//  ↓
// localStorage

// Now Rahul clicks:

// Book Now

// The code says only:

// api.post("/bookings", bookingData)

// Axios automatically changes the request into something conceptually like:

// POST /api/bookings


// Authorization:
// Bearer eyJhbGci...

// Backend receives it:

// protect middleware
//        ↓
// verify JWT
//        ↓
// req.user.userId
//        ↓
// create booking for Rahul

// 🔥 That's the complete frontend ↔ backend authentication connection.