import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import GuestDashboard from "./pages/GuestDashboard";
import HostDashboard from "./pages/HostDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";

import HostBookings from "./pages/HostBookings";




function App() {
  return (
    <BrowserRouter>

      <Navbar /> 

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/properties" element={<Properties />} />

        <Route
          path="/properties/:id"
          element={<PropertyDetails />}
        />

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute role="guest">
      <GuestDashboard />
    </ProtectedRoute>
  }
/>

      <Route
  path="/host"
  element={
    <ProtectedRoute role="host">
      <HostDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/host/properties/new"
  element={
    <ProtectedRoute role="host">
      <AddProperty />
    </ProtectedRoute>
  }
/>

<Route
  path="/host/properties/:id/edit"
  element={
    <ProtectedRoute role="host">
      <EditProperty />
    </ProtectedRoute>
  }
/>


<Route
  path="/host/bookings"
  element={
    <ProtectedRoute role="host">
      <HostBookings />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;



// User opens /host
//        ↓
// Is logged in?
//        ↓
//    Yes
//        ↓
// user.role === "host"?
//     ↙          ↘
//   Yes           No
//    ↓             ↓
// Host Dashboard   Home

// So if a guest manually types:

// /host

// they get redirected to /.