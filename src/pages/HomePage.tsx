import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
            Full Stack Final Project
          </p>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl">
            Find the right roommate, not just a room
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-8 text-slate-300">
            RoomieMatch helps users find compatible roommates based on
            lifestyle, habits, budget, and preferred area.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-white/15 px-5 py-3 font-semibold text-white"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-lg font-semibold">Compatibility Preview</h2>

          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-900/70 p-4">
              <p className="text-sm text-slate-400">Budget</p>
              <p className="mt-1 font-medium">4,000–5,500 ₪</p>
            </div>

            <div className="rounded-2xl bg-slate-900/70 p-4">
              <p className="text-sm text-slate-400">Lifestyle</p>
              <p className="mt-1 font-medium">Clean, quiet, non-smoker</p>
            </div>

            <div className="rounded-2xl bg-slate-900/70 p-4">
              <p className="text-sm text-slate-400">Area</p>
              <p className="mt-1 font-medium">Tel Aviv / Ramat Gan</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <h2 className="mb-8 text-2xl font-bold">Core Features</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-3 text-lg font-semibold">Smart Matching</h3>
            <p className="text-slate-300">
              Match users by habits, budget, and living preferences.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-3 text-lg font-semibold">Apartment Search</h3>
            <p className="text-slate-300">
              Find apartments that fit both roommates and budget.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-3 text-lg font-semibold">Real-Time Chat</h3>
            <p className="text-slate-300">
              Connect instantly with potential roommates.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage