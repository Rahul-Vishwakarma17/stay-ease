

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function PropertyDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  // =========================
  // Property
  // =========================

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // Images
  // =========================

  const [selectedImage, setSelectedImage] = useState(0);

  // =========================
  // Reviews
  // =========================

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(null);

  // Review form
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");

  // =========================
  // Booking
  // =========================

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");

  // =========================
  // Fetch Property + Reviews
  // =========================

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        // Property
        const response = await api.get(`/properties/${id}`);

        setProperty(response.data.property);

        // Reviews
        const reviewsResponse = await api.get(
          `/reviews/property/${id}`
        );

        setReviews(reviewsResponse.data.reviews);

        // Rating
        const ratingResponse = await api.get(
          `/reviews/property/${id}/rating`
        );

        setRating(ratingResponse.data);
      } catch (error) {
        console.error("Failed to fetch property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // =========================
  // Booking
  // =========================

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      setBookingLoading(true);
      setBookingMessage("");

      const response = await api.post("/bookings", {
        propertyId: id,
        checkIn,
        checkOut,
        guests: Number(guests),
      });

      setBookingMessage(response.data.message);
    } catch (error) {
      console.error("Booking error:", error);

      setBookingMessage(
        error.response?.data?.message ||
          "Booking failed"
      );
    } finally {
      setBookingLoading(false);
    }
  };

  // =========================
  // Review Submission
  // =========================

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      setReviewLoading(true);
      setReviewMessage("");

      await api.post("/reviews", {
        propertyId: id,
        rating: Number(reviewRating),
        comment: reviewComment,
      });

      setReviewMessage(
        "Review submitted successfully!"
      );

      setReviewComment("");

      // Refresh reviews
      const reviewsResponse = await api.get(
        `/reviews/property/${id}`
      );

      setReviews(reviewsResponse.data.reviews);

      // Refresh rating
      const ratingResponse = await api.get(
        `/reviews/property/${id}/rating`
      );

      setRating(ratingResponse.data);
    } catch (error) {
      console.error("Review error:", error);

      setReviewMessage(
        error.response?.data?.message ||
          "Failed to submit review"
      );
    } finally {
      setReviewLoading(false);
    }
  };

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500"></div>

          <p className="font-medium text-gray-600">
            Loading property...
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // Property Not Found
  // =========================

  if (!property) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            Property not found
          </h2>

          <p className="mt-2 text-gray-500">
            This property may have been removed.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16">

      {/* =========================
          Property Images
      ========================= */}

      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">

        {property.images?.length > 0 && (
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

            {/* Main Image */}

            <div className="relative h-[300px] overflow-hidden sm:h-[450px] lg:h-[550px]">

              <img
                src={property.images[selectedImage]}
                alt={property.title}
                className="h-full w-full object-cover"
              />

              {/* Image counter */}

              <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                {selectedImage + 1} / {property.images.length}
              </div>

            </div>

            {/* Thumbnails */}

            <div className="flex gap-3 overflow-x-auto p-4">

              {property.images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`h-20 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 transition ${
                    selectedImage === index
                      ? "border-orange-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${property.title} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}

            </div>

          </div>
        )}

      </section>

      {/* =========================
          Main Content
      ========================= */}

      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* =========================
              Left Side
          ========================= */}

          <div>

            {/* Property Information */}

            <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">

              <div className="flex flex-col justify-between gap-4 sm:flex-row">

                <div>

                  <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
                    {property.category}
                  </p>

                  <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    {property.title}
                  </h1>

                  <p className="mt-3 flex items-center gap-2 text-gray-500">
                    <span>📍</span>
                    {property.location?.city},{" "}
                    {property.location?.country}
                  </p>

                </div>

                {/* Rating */}

                {rating && rating.totalReviews > 0 && (
                  <div className="flex h-fit items-center gap-3 rounded-2xl bg-orange-50 px-5 py-3">

                    <div className="text-2xl">
                      ⭐
                    </div>

                    <div>
                      <p className="text-xl font-extrabold text-gray-900">
                        {rating.averageRating}
                      </p>

                      <p className="text-xs text-gray-500">
                        {rating.totalReviews} reviews
                      </p>
                    </div>

                  </div>
                )}

              </div>

              <div className="my-7 h-px bg-gray-100"></div>

              {/* Description */}

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  About this property
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  {property.description}
                </p>

              </div>

              {/* Property Details */}

              <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xl">👥</p>
                  <p className="mt-2 text-xs text-gray-500">
                    Guests
                  </p>
                  <p className="font-bold text-gray-900">
                    {property.maxGuests}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xl">🛏️</p>
                  <p className="mt-2 text-xs text-gray-500">
                    Bedrooms
                  </p>
                  <p className="font-bold text-gray-900">
                    {property.bedrooms}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xl">🚿</p>
                  <p className="mt-2 text-xs text-gray-500">
                    Bathrooms
                  </p>
                  <p className="font-bold text-gray-900">
                    {property.bathrooms}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xl">🏠</p>
                  <p className="mt-2 text-xs text-gray-500">
                    Category
                  </p>
                  <p className="font-bold capitalize text-gray-900">
                    {property.category}
                  </p>
                </div>

              </div>

              {/* Amenities */}

              {property.amenities?.length > 0 && (
                <div className="mt-8">

                  <h2 className="text-xl font-bold text-gray-900">
                    Amenities
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-3">

                    {property.amenities.map(
                      (amenity, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                        >
                          ✓ {amenity}
                        </span>
                      )
                    )}

                  </div>

                </div>
              )}

            </section>

            {/* =========================
                Reviews
            ========================= */}

            <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm sm:p-8">

              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                <div>

                  <h2 className="text-2xl font-extrabold text-gray-900">
                    Guest reviews
                  </h2>

                  {rating && rating.totalReviews > 0 ? (
                    <p className="mt-2 text-sm text-gray-500">
                      ⭐ {rating.averageRating} average rating
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-gray-500">
                      No ratings yet
                    </p>
                  )}

                </div>

                {rating && (
                  <div className="rounded-2xl bg-orange-50 px-6 py-4 text-center">

                    <p className="text-3xl font-extrabold text-orange-500">
                      {rating.averageRating}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {rating.totalReviews} reviews
                    </p>

                  </div>
                )}

              </div>

              {/* Reviews */}

              {reviews.length === 0 ? (

                <div className="mt-8 rounded-2xl bg-gray-50 px-6 py-12 text-center">

                  <div className="text-4xl">
                    💬
                  </div>

                  <p className="mt-4 font-bold text-gray-800">
                    No reviews yet
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Be the first guest to review this property.
                  </p>

                </div>

              ) : (

                <div className="mt-8 space-y-6">

                  {reviews.map((review) => (

                    <div
                      key={review._id}
                      className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                    >

                      <div className="flex items-center justify-between gap-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">

                            {review.guest?.name
                              ?.charAt(0)
                              .toUpperCase() || "G"}

                          </div>

                          <div>

                            <p className="font-bold text-gray-900">
                              {review.guest?.name ||
                                "Guest"}
                            </p>

                            <p className="text-xs text-gray-400">
                              Guest
                            </p>

                          </div>

                        </div>

                        <div className="text-sm tracking-wide">
                          {"⭐".repeat(
                            review.rating || 0
                          )}
                        </div>

                      </div>

                      <p className="mt-4 leading-7 text-gray-600">
                        {review.comment}
                      </p>

                    </div>

                  ))}

                </div>

              )}

            </section>

            {/* =========================
                Write Review
            ========================= */}

            <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm sm:p-8">

              <div>

                <h2 className="text-2xl font-extrabold text-gray-900">
                  Write a Review
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Share your experience with other guests.
                </p>

              </div>

              {!user ? (

                <div className="mt-6 rounded-2xl bg-gray-50 p-6 text-center">

                  <p className="font-semibold text-gray-700">
                    Please login to write a review.
                  </p>

                </div>

              ) : (

                <form
                  onSubmit={handleReviewSubmit}
                  className="mt-6 space-y-6"
                >

                  {/* Rating */}

                  <div>

                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      Your rating
                    </label>

                    <div className="flex gap-2">

                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() =>
                              setReviewRating(star)
                            }
                            className={`text-3xl transition hover:scale-110 ${
                              star <= reviewRating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </button>
                        )
                      )}

                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      {reviewRating}/5
                    </p>

                  </div>

                  {/* Comment */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Your review
                    </label>

                    <textarea
                      value={reviewComment}
                      onChange={(e) =>
                        setReviewComment(e.target.value)
                      }
                      placeholder="Share your experience..."
                      rows="5"
                      required
                      className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />

                  </div>

                  {/* Message */}

                  {reviewMessage && (
                    <div
                      className={`rounded-xl px-4 py-3 text-sm font-medium ${
                        reviewMessage.includes(
                          "successfully"
                        )
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {reviewMessage}
                    </div>
                  )}

                  {/* Submit */}

                  <button
                    type="submit"
                    disabled={reviewLoading}
                    className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {reviewLoading
                      ? "Submitting..."
                      : "Submit Review"}
                  </button>

                </form>

              )}

            </section>

          </div>

          {/* =========================
              Right Side - Booking
          ========================= */}

          <aside>

            <div className="sticky top-6 rounded-3xl bg-white p-6 shadow-lg">

              <div className="flex items-end justify-between">

                <div>

                  <span className="text-3xl font-extrabold text-gray-900">
                    ₹{property.pricePerNight}
                  </span>

                  <span className="ml-1 text-gray-500">
                    / night
                  </span>

                </div>

                {rating &&
                  rating.totalReviews > 0 && (
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ⭐ {rating.averageRating}
                      </p>

                      <p className="text-xs text-gray-500">
                        {rating.totalReviews} reviews
                      </p>
                    </div>
                  )}

              </div>

              <div className="my-6 h-px bg-gray-100"></div>

              <h2 className="text-xl font-bold text-gray-900">
                Book this property
              </h2>

              {!user ? (

                <div className="mt-5 rounded-2xl bg-orange-50 p-5">

                  <p className="text-sm font-medium text-orange-800">
                    Please login to book this property.
                  </p>

                </div>

              ) : (

                <form
                  onSubmit={handleBooking}
                  className="mt-5 space-y-4"
                >

                  {/* Check-in */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Check-in
                    </label>

                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) =>
                        setCheckIn(e.target.value)
                      }
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />

                  </div>

                  {/* Check-out */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Check-out
                    </label>

                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) =>
                        setCheckOut(e.target.value)
                      }
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />

                  </div>

                  {/* Guests */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Guests
                    </label>

                    <input
                      type="number"
                      min="1"
                      max={property.maxGuests}
                      value={guests}
                      onChange={(e) =>
                        setGuests(e.target.value)
                      }
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />

                    <p className="mt-1 text-xs text-gray-400">
                      Maximum {property.maxGuests} guests
                    </p>

                  </div>

                  {/* Submit */}

                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full rounded-xl bg-orange-500 py-3.5 font-bold text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {bookingLoading
                      ? "Booking..."
                      : "Book Now"}
                  </button>

                </form>

              )}

              {/* Booking message */}

              {bookingMessage && (
                <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
                  {bookingMessage}
                </div>
              )}

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}

export default PropertyDetails;