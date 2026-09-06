

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function HostBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostBookings = async () => {
      try {
        const response = await api.get("/bookings/host");

        setBookings(response.data.bookings);
      } catch (error) {
        console.error(
          "Failed to fetch host bookings:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHostBookings();
  }, []);

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf9f7] px-6 py-12">
        <div className="mx-auto max-w-7xl animate-pulse">

          <div className="h-10 w-64 rounded-lg bg-gray-200" />

          <div className="mt-3 h-5 w-80 rounded bg-gray-200" />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="h-28 rounded-2xl bg-gray-200" />
            <div className="h-28 rounded-2xl bg-gray-200" />
            <div className="h-28 rounded-2xl bg-gray-200" />
          </div>

          <div className="mt-8 h-64 rounded-2xl bg-gray-200" />

        </div>
      </main>
    );
  }

  // Statistics
  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "cancelled"
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
              Host Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Guest Bookings
            </h1>

            <p className="mt-2 text-gray-500">
              Manage reservations made for your properties.
            </p>

          </div>

          <Link
            to="/host"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm transition hover:border-orange-300 hover:text-orange-500"
          >
            ← Back to dashboard
          </Link>

        </div>

        {/* =========================
            Statistics
        ========================= */}

        <section className="mt-8 grid gap-5 md:grid-cols-3">

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
                📅
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
            Booking List
        ========================= */}

        <section className="mt-10">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">
                Reservations
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Guests who have booked your properties.
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
                📅
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                No bookings yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                When guests book one of your properties,
                their reservations will appear here.
              </p>

              <Link
                to="/host"
                className="mt-6 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
              >
                Back to dashboard
              </Link>

            </div>

          ) : (

            <div className="grid gap-5">

              {bookings.map((booking) => (

                <div
                  key={booking._id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-lg"
                >

                  <div className="p-6">

                    {/* Top section */}

                    <div className="flex flex-col justify-between gap-5 md:flex-row">

                      <div className="flex gap-4">

                        {/* Guest Avatar */}

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-600">
                          {booking.guest?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "G"}
                        </div>

                        <div>

                          <p className="text-xs font-medium text-gray-400">
                            Guest
                          </p>

                          <h3 className="mt-1 text-lg font-bold text-gray-900">
                            {booking.guest?.name ||
                              "Guest"}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            {booking.guest?.email ||
                              "No email available"}
                          </p>

                        </div>

                      </div>

                      {/* Status + Price */}

                      <div className="flex flex-col items-start gap-2 md:items-end">

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
                            booking.status?.slice(1)}
                        </span>

                        <p className="text-xl font-extrabold text-gray-900">
                          ₹{booking.totalPrice}
                        </p>

                      </div>

                    </div>

                    {/* Property */}

                    <div className="mt-6 rounded-xl bg-orange-50 p-4">

                      <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                        Property
                      </p>

                      <h3 className="mt-1 font-bold text-gray-900">
                        {booking.property?.title ||
                          "Property"}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        📍{" "}
                        {booking.property?.location
                          ?.city ||
                          "Location"}
                      </p>

                    </div>

                    {/* Booking details */}

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">

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
                          {booking.guests}{" "}
                          {booking.guests === 1
                            ? "Guest"
                            : "Guests"}
                        </p>

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

export default HostBookings;