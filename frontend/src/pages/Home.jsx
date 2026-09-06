

import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="bg-[#faf9f7]">

      {/* =========================
          Hero Section
      ========================= */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />

        <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">

          {/* Hero Content */}
          <div className="relative z-10">

            <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
              ✨ Find your perfect stay
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl">
              Stay somewhere
              <span className="block text-orange-500">
                you'll love.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Discover beautiful places, comfortable homes,
              and unforgettable stays — all in one place.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                to="/properties"
                className="rounded-xl bg-orange-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
              >
                Explore Properties →
              </Link>

              <Link
                to="/register"
                className="rounded-xl border border-gray-200 bg-white px-7 py-3.5 font-semibold text-gray-700 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
              >
                Become a Host
              </Link>

            </div>

            {/* Trust */}
            <div className="mt-10 flex flex-wrap gap-8">

              <div>
                <p className="text-2xl font-bold text-gray-900">
                  100+
                </p>

                <p className="text-sm text-gray-500">
                  Properties
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-gray-900">
                  50+
                </p>

                <p className="text-sm text-gray-500">
                  Happy Guests
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-gray-900">
                  4.8★
                </p>

                <p className="text-sm text-gray-500">
                  Average Rating
                </p>
              </div>

            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">

            <div className="overflow-hidden rounded-[2rem] shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
                alt="Beautiful modern home"
                className="h-[500px] w-full object-cover transition duration-700 hover:scale-105"
              />

            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-white p-4 shadow-xl sm:left-10">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-xl">
                  ⭐
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Highly Rated
                  </p>

                  <p className="text-xs text-gray-500">
                    Loved by our guests
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================
          Search Section
      ========================= */}
      <section className="relative z-20 mx-auto -mt-8 max-w-5xl px-6">

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">

          <div className="grid gap-3 md:grid-cols-4">

            <div className="rounded-xl bg-gray-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Location
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-700">
                Where are you going?
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Check in
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-700">
                Add dates
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Guests
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-700">
                Add guests
              </p>
            </div>

            <Link
              to="/properties"
              className="flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              🔍 Search
            </Link>

          </div>

        </div>
      </section>

      {/* =========================
          Why StayEase
      ========================= */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="text-center">

          <span className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Why StayEase
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything you need for a better stay
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            We make finding and booking your next stay
            simple, comfortable, and reliable.
          </p>

        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {/* Card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
              🏡
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Beautiful Properties
            </h3>

            <p className="mt-3 leading-7 text-gray-500">
              Discover carefully listed homes and stays
              designed to make you feel comfortable.
            </p>

          </div>

          {/* Card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
              🔒
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Safe & Secure
            </h3>

            <p className="mt-3 leading-7 text-gray-500">
              Secure authentication and reliable booking
              make your experience worry-free.
            </p>

          </div>

          {/* Card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
              ⭐
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Trusted Reviews
            </h3>

            <p className="mt-3 leading-7 text-gray-500">
              Read genuine guest reviews before choosing
              your perfect place.
            </p>

          </div>

        </div>
      </section>

      {/* =========================
          CTA
      ========================= */}
      <section className="mx-auto max-w-7xl px-6 pb-24">

        <div className="overflow-hidden rounded-[2rem] bg-orange-500 px-8 py-16 text-center shadow-xl shadow-orange-100 sm:px-16">

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to find your next stay?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-orange-50">
            Explore unique properties and find a place
            that feels like home.
          </p>

          <Link
            to="/properties"
            className="mt-8 inline-flex rounded-xl bg-white px-7 py-3.5 font-semibold text-orange-600 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            Explore Properties
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Home;