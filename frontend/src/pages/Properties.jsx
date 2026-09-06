

import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import api from "../services/api";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [guests, setGuests] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const fetchProperties = async (filters = {}) => {
    try {
      setLoading(true);

      const params = {};

      if (filters.city) params.city = filters.city;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.guests) params.guests = filters.guests;
      if (filters.bedrooms) params.bedrooms = filters.bedrooms;
      if (filters.category) params.category = filters.category;
      if (filters.sort) params.sort = filters.sort;

      const response = await api.get("/properties/search", {
        params,
      });

      setProperties(response.data.properties);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    fetchProperties({
      city,
      minPrice,
      maxPrice,
      guests,
      bedrooms,
      category,
      sort,
    });
  };

  const clearFilters = () => {
    setCity("");
    setMinPrice("");
    setMaxPrice("");
    setGuests("");
    setBedrooms("");
    setCategory("");
    setSort("");

    fetchProperties();
  };

  return (
    <main className="min-h-screen bg-[#faf9f7]">

      {/* =========================
          Header
      ========================= */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">

          <span className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Discover
          </span>

          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Find your perfect stay
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            Explore beautiful properties and find a place
            that feels like home.
          </p>

        </div>
      </section>

      {/* =========================
          Search & Filters
      ========================= */}
      <section className="mx-auto max-w-7xl px-6 py-8">

        <form
          onSubmit={handleSearch}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
        >

          {/* Search row */}
          <div className="grid gap-4 lg:grid-cols-4">

            {/* City */}
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Location
              </label>

              <input
                type="text"
                placeholder="Search by city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              >
                <option value="">All categories</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Hotel">Hotel</option>
                <option value="House">House</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Sort by
              </label>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              >
                <option value="">Recommended</option>
                <option value="price_asc">
                  Price: Low to High
                </option>
                <option value="price_desc">
                  Price: High to Low
                </option>
                <option value="newest">
                  Newest
                </option>
              </select>
            </div>

          </div>

          {/* Advanced filters */}
          <div className="mt-4 grid gap-4 border-t border-gray-100 pt-4 sm:grid-cols-2 lg:grid-cols-4">

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-500">
                Minimum Price
              </label>

              <input
                type="number"
                placeholder="₹ Minimum"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-500">
                Maximum Price
              </label>

              <input
                type="number"
                placeholder="₹ Maximum"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-500">
                Guests
              </label>

              <input
                type="number"
                min="1"
                placeholder="Number of guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-500">
                Bedrooms
              </label>

              <input
                type="number"
                min="1"
                placeholder="Number of bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-5 flex flex-wrap justify-end gap-3">

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Clear
            </button>

            <button
              type="submit"
              className="rounded-xl bg-orange-500 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg"
            >
              🔍 Search Properties
            </button>

          </div>

        </form>
      </section>

      {/* =========================
          Results
      ========================= */}
      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Available Properties
            </h2>

            {!loading && (
              <p className="mt-1 text-sm text-gray-500">
                {properties.length}{" "}
                {properties.length === 1
                  ? "property"
                  : "properties"}{" "}
                found
              </p>
            )}
          </div>

        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[430px] animate-pulse rounded-2xl bg-gray-200"
              />
            ))}

          </div>
        ) : properties.length === 0 ? (

          /* Empty */
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">

            <div className="text-5xl">
              🏡
            </div>

            <h3 className="mt-4 text-xl font-bold text-gray-900">
              No properties found
            </h3>

            <p className="mt-2 text-gray-500">
              Try changing your search filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Clear Filters
            </button>

          </div>

        ) : (

          /* Property Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default Properties;