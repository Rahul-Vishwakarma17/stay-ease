

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditProperty() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // Fetch Property
  // =========================

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await api.get(
          `/properties/${id}`
        );

        const property = response.data.property;

        setFormData({
          title: property.title || "",
          description: property.description || "",
          city: property.location?.city || "",
          country: property.location?.country || "",
          pricePerNight: property.pricePerNight || "",
          maxGuests: property.maxGuests || "",
          bedrooms: property.bedrooms || "",
          bathrooms: property.bathrooms || "",
          category: property.category || "",
          amenities: property.amenities
            ? property.amenities.join(", ")
            : "",
        });
      } catch (error) {
        console.error(
          "Failed to fetch property:",
          error
        );

        setError("Failed to load property");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // =========================
  // Handle Input
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // Update Property
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await api.put(`/properties/${id}`, {
        title: formData.title,
        description: formData.description,

        location: {
          city: formData.city,
          country: formData.country,
        },

        pricePerNight: Number(
          formData.pricePerNight
        ),

        maxGuests: Number(
          formData.maxGuests
        ),

        bedrooms: Number(
          formData.bedrooms
        ),

        bathrooms: Number(
          formData.bathrooms
        ),

        category: formData.category,

        amenities: formData.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      navigate("/host");
    } catch (error) {
      console.error(
        "Update property error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update property"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf9f7] px-4 py-10 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-4xl animate-pulse">

          <div className="h-4 w-32 rounded bg-gray-200" />

          <div className="mt-4 h-10 w-72 rounded-lg bg-gray-200" />

          <div className="mt-3 h-5 w-96 rounded bg-gray-200" />

          <div className="mt-8 h-[600px] rounded-3xl bg-gray-200" />

        </div>

      </main>
    );
  }

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
            Edit your property
          </h1>

          <p className="mt-2 text-gray-500">
            Update your property's information and
            details.
          </p>

        </div>

        {/* =========================
            Form
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
                Update the basic information guests see.
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
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Beautiful Villa"
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
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your property..."
                  rows={5}
                  required
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
                Update where your property is located.
              </p>

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  City
                </label>

                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Vapi"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Country
                </label>

                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="e.g. India"
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
                Update pricing and capacity.
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
                Keep your property information up to date.
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
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Villa"
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
                  value={formData.amenities}
                  onChange={handleChange}
                  placeholder="WiFi, Pool, Parking, Kitchen"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Separate amenities with commas.
                </p>

              </div>

            </div>

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
              Actions
          ========================= */}

          <div className="flex flex-col-reverse gap-3 p-6 sm:flex-row sm:justify-end sm:p-8">

            <button
              type="button"
              onClick={() => navigate("/host")}
              disabled={saving}
              className="rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-orange-500 px-7 py-3 font-bold text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving changes..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}

export default EditProperty;