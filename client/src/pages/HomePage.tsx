import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
      <section className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
            Lifestyle-first matching
          </p>

          <h1 className="mb-6 text-[2.35rem] font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.05]">
            A roommate who fits{' '}
            <span className="bg-linear-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
              how you live
            </span>
            , not just your rent.
          </h1>

          <p className="mb-9 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
            We pair you on routines, noise, cleanliness, budget, and neighborhood—so
            moving in feels like a step forward, not a dice roll.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-cyan-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_-14px_rgba(8,145,178,0.5)] transition hover:brightness-110"
            >
              Create your profile
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
            >
              I already have an account
            </Link>
          </div>

          <p className="mt-8 text-xs text-slate-500">
            No spammy listings—just clearer signals and smarter introductions.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-4xl bg-linear-to-br from-cyan-500/10 via-transparent to-violet-500/10 blur-2xl" />
          <div className="relative rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.22)] sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-900">
                Sample compatibility
              </h2>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                Strong fit
              </span>
            </div>

            <div className="space-y-3">
              {[
                { k: 'Rent band', v: '₪4,000–5,500 / mo' },
                { k: 'House style', v: 'Tidy, quiet evenings, non-smoking' },
                { k: 'Areas', v: 'Tel Aviv · Ramat Gan' },
              ].map((row) => (
                <div
                  key={row.k}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5"
                >
                  <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    {row.k}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-800">{row.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 py-16 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Built for the messy middle
          </h2>
          <p className="mt-3 text-slate-600">
            The part where habits matter as much as square meters.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Matches that respect your pace',
              body: 'Sleep schedules, guests, and chores—surfaced up front so awkward surprises stay rare.',
            },
            {
              title: 'Homes that work for two budgets',
              body: 'Explore places that make sense for both of you, not just whoever clicked first.',
            },
            {
              title: 'Chat when you are ready',
              body: 'Warm intros when there is real overlap—no endless cold DMs.',
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-slate-300 hover:bg-white"
            >
              <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500/20 to-violet-500/20 text-xs font-bold text-cyan-700">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
