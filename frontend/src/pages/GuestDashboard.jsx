

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function GuestDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get("/bookings/my-bookings");

        setBookings(response.data.bookings);
      } catch (error) {
        console.error(
          "Failed to fetch bookings:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Cancel booking
  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      await api.delete(`/bookings/${bookingId}`);

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking._id === bookingId
            ? {
                ...booking,
                status: "cancelled",
              }
            : booking
        )
      );
    } catch (error) {
      console.error(
        "Cancel booking error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to cancel booking"
      );
    }
  };

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf9f7] px-6 py-12">
        <div className="mx-auto max-w-7xl animate-pulse">

          <div className="h-10 w-72 rounded-lg bg-gray-200" />

          <div className="mt-3 h-5 w-96 rounded bg-gray-200" />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="h-28 rounded-2xl bg-gray-200" />
            <div className="h-28 rounded-2xl bg-gray-200" />
            <div className="h-28 rounded-2xl bg-gray-200" />
          </div>

          <div className="mt-10 h-72 rounded-2xl bg-gray-200" />

        </div>
      </main>
    );
  }

  // Statistics
  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter(
    (booking) =>
      booking.status === "confirmed"
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) =>
      booking.status === "cancelled"
  ).length;

  return (
    <main className="min-h-screen bg-[#faf9f7]">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* =========================
            Header
        ========================= */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>

            <p className="text-sm font-semibold text-orange-500">
              Guest Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              My Bookings
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your stays and upcoming trips.
            </p>

          </div>

          <Link
            to="/properties"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white shadow-lg shadow-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-600"
          >
            <span>+</span>
            Find a property
          </Link>

        </div>

        {/* =========================
            Statistics
        ========================= */}

        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total */}

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total bookings
                </p>

                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {totalBookings}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
                🧳
              </div>

            </div>

          </div>

          {/* Confirmed */}

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Confirmed
                </p>

                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {confirmedBookings}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl">
                ✓
              </div>

            </div>

          </div>

          {/* Cancelled */}

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Cancelled
                </p>

                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {cancelledBookings}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-xl">
                ×
              </div>

            </div>

          </div>

        </section>

        {/* =========================
            Bookings
        ========================= */}

        <section className="mt-10">

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Your stays
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your booking history
              </p>
            </div>

            {bookings.length > 0 && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                {bookings.length}{" "}
                {bookings.length === 1
                  ? "booking"
                  : "bookings"}
              </span>
            )}

          </div>

          {/* Empty State */}

          {bookings.length === 0 ? (

            <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-4xl">
                🏡
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                No bookings yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                You haven't booked a stay yet.
                Explore our properties and find
                somewhere you'll love.
              </p>

              <Link
                to="/properties"
                className="mt-6 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
              >
                Explore properties
              </Link>

            </div>

          ) : (

            <div className="grid gap-6">

              {bookings.map((booking) => (

                <div
                  key={booking._id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-lg"
                >

                  <div className="grid lg:grid-cols-[280px_1fr]">

                    {/* Property Image */}

                    <div className="relative h-56 lg:h-full">

                      {booking.property?.images?.[0] ? (

                        <img
                          src={
                            booking.property.images[0]
                          }
                          alt={
                            booking.property.title
                          }
                          className="h-full w-full object-cover"
                        />

                      ) : (

                        <div className="flex h-full items-center justify-center bg-orange-50 text-5xl">
                          🏡
                        </div>

                      )}

                    </div>

                    {/* Booking Information */}

                    <div className="p-6">

                      <div className="flex flex-col justify-between gap-4 sm:flex-row">

                        <div>

                          <div className="flex flex-wrap items-center gap-2">

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-bold ${
                                booking.status ===
                                "confirmed"
                                  ? "bg-green-100 text-green-600"
                                  : booking.status ===
                                    "cancelled"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-yellow-100 text-yellow-600"
                              }`}
                            >
                              {booking.status
                                ?.charAt(0)
                                .toUpperCase() +
                                booking.status?.slice(
                                  1
                                )}
                            </span>

                          </div>

                          <h3 className="mt-3 text-xl font-bold text-gray-900">
                            {booking.property?.title ||
                              "Property"}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            📍{" "}
                            {booking.property
                              ?.location?.city ||
                              "Location"}
                          </p>

                        </div>

                        <div className="sm:text-right">

                          <p className="text-xs text-gray-400">
                            Total
                          </p>

                          <p className="text-2xl font-extrabold text-gray-900">
                            ₹
                            {booking.totalPrice}
                          </p>

                        </div>

                      </div>

                      {/* Details */}

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">

                        <div className="rounded-xl bg-gray-50 p-4">

                          <p className="text-xs font-medium text-gray-400">
                            Check-in
                          </p>

                          <p className="mt-1 font-semibold text-gray-800">
                            {booking.checkIn}
                          </p>

                        </div>

                        <div className="rounded-xl bg-gray-50 p-4">

                          <p className="text-xs font-medium text-gray-400">
                            Check-out
                          </p>

                          <p className="mt-1 font-semibold text-gray-800">
                            {booking.checkOut}
                          </p>

                        </div>

                        <div className="rounded-xl bg-gray-50 p-4">

                          <p className="text-xs font-medium text-gray-400">
                            Guests
                          </p>

                          <p className="mt-1 font-semibold text-gray-800">
                            {booking.guests}
                            {" "}
                            {booking.guests === 1
                              ? "Guest"
                              : "Guests"}
                          </p>

                        </div>

                      </div>

                      {/* Actions */}

                      <div className="mt-6 flex flex-wrap gap-3">

                        {booking.property?._id && (
                          <Link
                            to={`/properties/${booking.property._id}`}
                            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-orange-300 hover:text-orange-500"
                          >
                            View property
                          </Link>
                        )}

                        {booking.status ===
                          "confirmed" && (

                          <button
                            onClick={() =>
                              handleCancelBooking(
                                booking._id
                              )
                            }
                            className="rounded-xl border border-red-100 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                          >
                            Cancel booking
                          </button>

                        )}

                      </div>

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

export default GuestDashboard;