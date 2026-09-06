
import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  const image =
    property.images?.[0] ||
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80";

  return (
    <Link
      to={`/properties/${property._id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={property.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Category */}
        {property.category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur">
            {property.category}
          </span>
        )}

        {/* Rating */}
        <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur">
          ⭐ {property.rating || "New"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="line-clamp-1 text-lg font-bold text-gray-900">
              {property.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              📍 {property.location?.city},{" "}
              {property.location?.country}
            </p>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
          {property.description}
        </p>

        {/* Bottom */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <span className="text-xl font-bold text-gray-900">
              ₹{property.pricePerNight}
            </span>

            <span className="text-sm text-gray-500">
              {" "}
              / night
            </span>
          </div>

          <span className="text-sm font-semibold text-orange-500 transition group-hover:text-orange-600">
            View details →
          </span>
        </div>

        {/* Property info */}
        <div className="mt-4 flex gap-4 text-xs text-gray-500">
          <span>👥 {property.maxGuests} guests</span>
          <span>🛏️ {property.bedrooms} beds</span>
          <span>🚿 {property.bathrooms} baths</span>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;