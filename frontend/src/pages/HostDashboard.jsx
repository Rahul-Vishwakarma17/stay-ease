


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function HostDashboard() {
  const [stats, setStats] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHostData = async () => {
    try {
      const [statsResponse, propertiesResponse] =
        await Promise.all([
          api.get("/users/host/stats"),
          api.get("/users/host/properties"),
        ]);

      setStats(statsResponse.data);
      setProperties(
        propertiesResponse.data.properties
      );
    } catch (error) {
      console.error(
        "Failed to fetch host data:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostData();
  }, []);

  // Delete property
  const handleDelete = async (propertyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/properties/${propertyId}`
      );

      setProperties((currentProperties) =>
        currentProperties.filter(
          (property) =>
            property._id !== propertyId
        )
      );
    } catch (error) {
      console.error(
        "Delete property error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete property"
      );
    }
  };

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf9f7] px-6 py-12">
        <div className="mx-auto max-w-7xl animate-pulse">

          <div className="h-10 w-64 rounded bg-gray-200" />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="h-32 rounded-2xl bg-gray-200" />
            <div className="h-32 rounded-2xl bg-gray-200" />
            <div className="h-32 rounded-2xl bg-gray-200" />
          </div>

          <div className="mt-10 h-80 rounded-2xl bg-gray-200" />

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7]">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* =========================
            Header
        ========================= */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>

            <p className="text-sm font-semibold text-orange-500">
              Host Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Manage your properties
            </h1>

            <p className="mt-2 text-gray-500">
              Track your properties, bookings and earnings.
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <Link
              to="/host/bookings"
              className="rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm transition hover:border-orange-300 hover:text-orange-500"
            >
              📋 View bookings
            </Link>

            <Link
              to="/host/properties/new"
              className="rounded-xl bg-orange-500 px-5 py-3 font-bold text-white shadow-lg shadow-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              + Add property
            </Link>

          </div>

        </div>

        {/* =========================
            Statistics
        ========================= */}

        <section className="mt-8 grid gap-5 md:grid-cols-3">

          {/* Properties */}

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Total properties
                </p>

                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {stats?.totalProperties ||
                    0}
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
                🏠
              </div>

            </div>

          </div>

          {/* Bookings */}

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Total bookings
                </p>

                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {stats?.totalBookings ||
                    0}
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl">
                📅
              </div>

            </div>

          </div>

          {/* Earnings */}

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-gray-500">
                  Total earnings
                </p>

                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  ₹
                  {stats?.totalEarnings ||
                    0}
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl">
                💰
              </div>

            </div>

          </div>

        </section>

        {/* =========================
            Properties
        ========================= */}

        <section className="mt-10">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">
                My Properties
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage the places you're hosting.
              </p>

            </div>

            {properties.length > 0 && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                {properties.length}{" "}
                {properties.length === 1
                  ? "property"
                  : "properties"}
              </span>
            )}

          </div>

          {/* Empty */}

          {properties.length === 0 ? (

            <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-4xl">
                🏡
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                No properties yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                Add your first property and start
                welcoming guests to StayEase.
              </p>

              <Link
                to="/host/properties/new"
                className="mt-6 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
              >
                Add your first property
              </Link>

            </div>

          ) : (

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {properties.map((property) => (

                <div
                  key={property._id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Image */}

                  <div className="relative h-52 overflow-hidden">

                    {property.images?.[0] ? (

                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center bg-orange-50 text-5xl">
                        🏡
                      </div>

                    )}

                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-700 shadow-sm backdrop-blur">
                      {property.category ||
                        "Property"}
                    </span>

                  </div>

                  {/* Content */}

                  <div className="p-5">

                    <h3 className="truncate text-lg font-bold text-gray-900">
                      {property.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      📍{" "}
                      {property.location?.city ||
                        "Location"}
                    </p>

                    <div className="mt-4 flex items-end justify-between">

                      <div>

                        <span className="text-xl font-extrabold text-gray-900">
                          ₹
                          {property.pricePerNight}
                        </span>

                        <span className="text-xs text-gray-500">
                          {" "}
                          / night
                        </span>

                      </div>

                      <span className="text-xs text-gray-400">
                        👥{" "}
                        {property.maxGuests}
                      </span>

                    </div>

                    {/* Actions */}

                    <div className="mt-5 flex gap-2">

                      <Link
                        to={`/host/properties/${property._id}/edit`}
                        className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:border-orange-300 hover:text-orange-500"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(
                            property._id
                          )
                        }
                        className="rounded-xl border border-red-100 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}

export default HostDashboard;