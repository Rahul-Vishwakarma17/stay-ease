// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// function AddProperty() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     city: "",
//     country: "",
//     pricePerNight: "",
//     maxGuests: "",
//     bedrooms: "",
//     bathrooms: "",
//     category: "",
//     amenities: "",
//   });

//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       setError("");

//       const data = new FormData();

//       data.append("title", formData.title);
//       data.append("description", formData.description);

//       // Location
//       data.append("location[city]", formData.city);
//       data.append("location[country]", formData.country);

//       data.append("pricePerNight", formData.pricePerNight);
//       data.append("maxGuests", formData.maxGuests);
//       data.append("bedrooms", formData.bedrooms);
//       data.append("bathrooms", formData.bathrooms);

//       data.append("category", formData.category);
//       data.append("amenities", formData.amenities);

//       // Images
//       images.forEach((image) => {
//         data.append("images", image);
//       });

//       await api.post("/properties", data);

//       navigate("/host");
//     } catch (error) {
//       console.error("Create property error:", error);

//       setError(
//         error.response?.data?.message ||
//           "Failed to create property"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main>
//       <h1>Add Property</h1>

//       <form onSubmit={handleSubmit}>
//         {/* Title */}
//         <input
//           name="title"
//           placeholder="Property title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />

//         {/* Description */}
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//         />

//         {/* City */}
//         <input
//           name="city"
//           placeholder="City"
//           value={formData.city}
//           onChange={handleChange}
//           required
//         />

//         {/* Country */}
//         <input
//           name="country"
//           placeholder="Country"
//           value={formData.country}
//           onChange={handleChange}
//           required
//         />

//         {/* Price */}
//         <input
//           name="pricePerNight"
//           type="number"
//           placeholder="Price per night"
//           value={formData.pricePerNight}
//           onChange={handleChange}
//           required
//         />

//         {/* Guests */}
//         <input
//           name="maxGuests"
//           type="number"
//           placeholder="Maximum guests"
//           value={formData.maxGuests}
//           onChange={handleChange}
//           required
//         />

//         {/* Bedrooms */}
//         <input
//           name="bedrooms"
//           type="number"
//           placeholder="Bedrooms"
//           value={formData.bedrooms}
//           onChange={handleChange}
//           required
//         />

//         {/* Bathrooms */}
//         <input
//           name="bathrooms"
//           type="number"
//           placeholder="Bathrooms"
//           value={formData.bathrooms}
//           onChange={handleChange}
//           required
//         />

//         {/* Category */}
//         <input
//           name="category"
//           placeholder="Category (e.g. Villa)"
//           value={formData.category}
//           onChange={handleChange}
//           required
//         />

//         {/* Amenities */}
//         <input
//           name="amenities"
//           placeholder="Amenities (WiFi, Pool, Parking)"
//           value={formData.amenities}
//           onChange={handleChange}
//         />

//         {/* Images */}
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={(e) =>
//             setImages(Array.from(e.target.files))
//           }
//         />

//         {error && <p>{error}</p>}

//         <button type="submit" disabled={loading}>
//           {loading ? "Creating..." : "Create Property"}
//         </button>
//       </form>
//     </main>
//   );
// }

// export default AddProperty;\

// after css 

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddProperty() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    country: "",
    pricePerNight: "",
    maxGuests: "",
    bedrooms: "",
    bathrooms: "",
    category: "",
    amenities: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const removeImage = (indexToRemove) => {
    setImages((currentImages) =>
      currentImages.filter(
        (_, index) => index !== indexToRemove
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);

      // Location
      data.append("location[city]", formData.city);
      data.append("location[country]", formData.country);

      data.append(
        "pricePerNight",
        formData.pricePerNight
      );

      data.append(
        "maxGuests",
        formData.maxGuests
      );

      data.append(
        "bedrooms",
        formData.bedrooms
      );

      data.append(
        "bathrooms",
        formData.bathrooms
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "amenities",
        formData.amenities
      );

      // Images
      images.forEach((image) => {
        data.append("images", image);
      });

      await api.post("/properties", data);

      navigate("/host");
    } catch (error) {
      console.error(
        "Create property error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to create property"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9f7] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-4xl">

        {/* =========================
            Header
        ========================= */}

        <div className="mb-8">

          <button
            type="button"
            onClick={() => navigate("/host")}
            className="mb-5 text-sm font-semibold text-gray-500 transition hover:text-orange-500"
          >
            ← Back to dashboard
          </button>

          <p className="text-sm font-semibold text-orange-500">
            Host Dashboard
          </p>

          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Add your property
          </h1>

          <p className="mt-2 text-gray-500">
            Share your place with guests and start
            receiving bookings.
          </p>

        </div>

        {/* =========================
            Form Card
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
        >

          {/* =========================
              Basic Information
          ========================= */}

          <section className="border-b border-gray-100 p-6 sm:p-8">

            <div className="mb-6">

              <h2 className="text-xl font-bold text-gray-900">
                Basic information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Tell guests a little about your property.
              </p>

            </div>

            <div className="space-y-5">

              {/* Title */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Property title
                </label>

                <input
                  name="title"
                  placeholder="e.g. Beautiful Villa near the beach"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />

              </div>

              {/* Description */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  placeholder="Describe your property, the surroundings and what makes it special..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />

              </div>

            </div>

          </section>

          {/* =========================
              Location
          ========================= */}

          <section className="border-b border-gray-100 p-6 sm:p-8">

            <div className="mb-6">

              <h2 className="text-xl font-bold text-gray-900">
                Location
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Where is your property located?
              </p>

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              {/* City */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  City
                </label>

                <input
                  name="city"
                  placeholder="e.g. Vapi"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />

              </div>

              {/* Country */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Country
                </label>

                <input
                  name="country"
                  placeholder="e.g. India"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />

              </div>

            </div>

          </section>

          {/* =========================
              Property Details
          ========================= */}

          <section className="border-b border-gray-100 p-6 sm:p-8">

            <div className="mb-6">

              <h2 className="text-xl font-bold text-gray-900">
                Property details
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add the important details guests need to know.
              </p>

            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {/* Price */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Price / night
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-gray-500">
                    ₹
                  </span>

                  <input
                    name="pricePerNight"
                    type="number"
                    min="1"
                    placeholder="4500"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-4 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />

                </div>

              </div>

              {/* Guests */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Max guests
                </label>

                <input
                  name="maxGuests"
                  type="number"
                  min="1"
                  placeholder="4"
                  value={formData.maxGuests}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />

              </div>

              {/* Bedrooms */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Bedrooms
                </label>

                <input
                  name="bedrooms"
                  type="number"
                  min="1"
                  placeholder="2"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />

              </div>

              {/* Bathrooms */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Bathrooms
                </label>

                <input
                  name="bathrooms"
                  type="number"
                  min="1"
                  placeholder="2"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />

              </div>

            </div>

          </section>

          {/* =========================
              Category & Amenities
          ========================= */}

          <section className="border-b border-gray-100 p-6 sm:p-8">

            <div className="mb-6">

              <h2 className="text-xl font-bold text-gray-900">
                Category & amenities
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Help guests understand what your property offers.
              </p>

            </div>

            <div className="space-y-5">

              {/* Category */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Property category
                </label>

                <input
                  name="category"
                  placeholder="e.g. Villa, Apartment, House"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />

              </div>

              {/* Amenities */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Amenities
                </label>

                <input
                  name="amenities"
                  placeholder="WiFi, Pool, Parking, Kitchen"
                  value={formData.amenities}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Separate multiple amenities with commas.
                </p>

              </div>

            </div>

          </section>

          {/* =========================
              Images
          ========================= */}

          <section className="border-b border-gray-100 p-6 sm:p-8">

            <div className="mb-6">

              <h2 className="text-xl font-bold text-gray-900">
                Property photos
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add photos that show guests what your property looks like.
              </p>

            </div>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center transition hover:border-orange-300 hover:bg-orange-50">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-2xl">
                📷
              </div>

              <p className="mt-4 font-semibold text-gray-800">
                Click to upload photos
              </p>

              <p className="mt-1 text-sm text-gray-400">
                PNG, JPG or JPEG
              </p>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

            </label>

            {/* Selected images */}

            {images.length > 0 && (
              <div className="mt-5">

                <p className="mb-3 text-sm font-semibold text-gray-700">
                  Selected photos ({images.length})
                </p>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

                  {images.map((image, index) => (

                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl border border-gray-200"
                    >

                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Property ${index + 1}`}
                        className="h-32 w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(index)
                        }
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-sm font-bold text-white opacity-0 transition group-hover:opacity-100"
                      >
                        ×
                      </button>

                    </div>

                  ))}

                </div>

              </div>
            )}

          </section>

          {/* =========================
              Error
          ========================= */}

          {error && (
            <div className="mx-6 mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 sm:mx-8">
              {error}
            </div>
          )}

          {/* =========================
              Submit
          ========================= */}

          <div className="flex flex-col-reverse gap-3 p-6 sm:flex-row sm:justify-end sm:p-8">

            <button
              type="button"
              onClick={() => navigate("/host")}
              disabled={loading}
              className="rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-orange-500 px-7 py-3 font-bold text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating property..."
                : "Create Property"}
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}

export default AddProperty;