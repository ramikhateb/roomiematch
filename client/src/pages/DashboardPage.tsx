import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

function DashboardPage() {
  const topMatches = [
    { name: 'Noa Levi', score: 92, notes: 'Quiet evenings, similar budget, pet-friendly' },
    { name: 'Daniel Cohen', score: 88, notes: 'Early schedule, tidy habits, no smoking' },
    { name: 'Maya Ben David', score: 84, notes: 'WFH compatible, social 1-2 nights/week' },
  ]

  return (
    <div className="page-shell max-w-7xl">
      <PageHeader
        eyebrow="Dashboard"
        title="Welcome back,"
        accent="your search is in motion"
        subtitle="Track compatibility progress, shortlist apartments, and prep for better roommate introductions."
      />

      <section className="mb-8 grid gap-3 sm:mb-10 sm:grid-cols-3" aria-label="Overview">
        {[
          { value: '12', label: 'Fresh roommate candidates', hint: 'Updated by preferences' },
          { value: '7', label: 'Saved apartments', hint: 'Ready to compare' },
          { value: '82%', label: 'Profile completeness', hint: 'Add entry date to improve' },
        ].map((stat) => (
          <div key={stat.label} className="panel-muted px-5 py-4 transition hover:border-slate-300">
            <p className="text-2xl font-bold tabular-nums tracking-tight text-slate-900">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-700">{stat.label}</p>
            <p className="mt-1 text-xs text-slate-500">{stat.hint}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-12 lg:gap-5" aria-label="Actions">
        <div className="panel relative lg:col-span-7">
          <div className="relative flex h-full flex-col p-6 sm:p-8">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500/20 to-violet-500/15 text-cyan-700">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                    Suggested roommates
                  </h2>
                  <p className="text-sm text-slate-600">
                    Explainable scoring by budget, routines, and boundaries.
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-full border border-cyan-300/50 bg-cyan-100 px-2.5 py-1 text-[11px] font-semibold text-cyan-800">
                UI preview
              </span>
            </div>

            <div className="mb-6 grid gap-3">
              {topMatches.map((match) => (
                <article key={match.name} className="panel-muted p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{match.name}</h3>
                      <p className="mt-1 text-xs text-slate-600">{match.notes}</p>
                    </div>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      {match.score}% fit
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-linear-to-r from-cyan-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(8,145,178,0.5)] transition hover:brightness-110 min-[480px]:flex-none"
              >
                Polish your profile
              </Link>
              <Link
                to="/apartments"
                className="inline-flex min-[480px]:flex-none items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Browse apartments
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="panel p-6 transition hover:border-slate-300">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </span>
              <div>
                <h2 className="font-semibold text-slate-900">Messages</h2>
                <p className="text-xs text-slate-500">One inbox for roommate chat</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              When you match, threads land here—no scattered apps or forgotten
              replies.
            </p>
            <p className="mt-4 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs text-slate-500">
              Messaging module unlocks after first mutual intro
            </p>
          </div>

          <div className="panel p-6 transition hover:border-slate-300">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-violet-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <div>
                <h2 className="font-semibold text-slate-900">Profile & preferences</h2>
                <p className="text-xs text-slate-500">What drives your matches</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              Sleep, noise, guests, pets—small edits here sharpen who we suggest
              next.
            </p>
            <Link className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50" to="/register">
              Review signup answers
            </Link>
          </div>
        </div>
      </section>

      <aside className="panel mt-8 flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center sm:p-7">
        <div>
          <p className="text-sm font-semibold text-slate-900">Hunting for the flat?</p>
          <p className="mt-1 text-sm text-slate-500">
            Filter by city and budget, then shortlist with a roommate in mind.
          </p>
        </div>
        <Link
          to="/apartments"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 transition hover:bg-slate-100"
        >
          Open apartments
          <svg
            className="h-4 w-4 text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </aside>
    </div>
  )
}

export default DashboardPage
