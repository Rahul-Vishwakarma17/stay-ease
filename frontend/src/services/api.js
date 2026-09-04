// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// export default api;


// Why this file?

// Instead of writing:

// axios.get("http://localhost:5000/api/...")

// everywhere, we'll use:

// api.get("/properties");

// Later, if our backend URL changes during deployment, we only need to change the configuration in one place.


import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;



// What does this do?

// Whenever we write:

// api.get("/properties");

// or:

// api.post("/bookings", data);

// Axios automatically checks:

// Is there a JWT in localStorage?
//         ↓
//       Yes
//         ↓
// Authorization: Bearer JWT

// So we don't have to manually add the JWT to every API request