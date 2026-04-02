import { Link } from 'react-router-dom'

function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      {/* Header */}
      <header className="relative mb-10 sm:mb-14">
        <div className="absolute -left-4 top-0 h-24 w-24 rounded-full bg-violet-500/15 blur-3xl sm:-left-8" />
        <div className="absolute -right-8 top-12 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative">
          <p className="mb-3 inline-flex items-center rounded-full border border-white/8 bg-white/4 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Dashboard
          </p>
          <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-[2.5rem] md:leading-[1.15]">
            Welcome back —{' '}
            <span className="bg-linear-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
              almost there
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Track matches, refine what you are looking for, and keep conversations
            moving. Built to feel calm, not like another noisy feed.
          </p>
        </div>
      </header>

      {/* Quick stats */}
      <section
        className="mb-8 grid gap-3 sm:mb-10 sm:grid-cols-3"
        aria-label="Overview"
      >
        {[
          { value: '—', label: 'New suggestions', hint: 'Based on your prefs' },
          { value: '—', label: 'Saved listings', hint: 'Tap save on a card' },
          { value: '3/4', label: 'Profile strength', hint: 'Add a photo next' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/7 bg-white/2 px-5 py-4 backdrop-blur-sm transition hover:border-white/12"
          >
            <p className="text-2xl font-bold tabular-nums tracking-tight text-white">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-200">{stat.label}</p>
            <p className="mt-1 text-xs text-zinc-500">{stat.hint}</p>
          </div>
        ))}
      </section>

      {/* Bento grid */}
      <section className="grid gap-4 lg:grid-cols-12 lg:gap-5" aria-label="Actions">
        {/* Main feature — matches */}
        <div className="relative lg:col-span-7">
          <div className="absolute -inset-px rounded-[1.35rem] bg-linear-to-br from-cyan-400/25 via-transparent to-violet-400/20 opacity-60 blur-sm" />
          <div className="relative flex h-full flex-col rounded-[1.25rem] border border-white/9 bg-white/4 p-6 shadow-[0_28px_90px_-48px_rgba(34,211,238,0.35)] sm:p-8">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400/20 to-violet-400/15 text-cyan-200">
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
                  <h2 className="text-lg font-bold text-white sm:text-xl">
                    Suggested roommates
                  </h2>
                  <p className="text-sm text-zinc-400">
                    Ranked by lifestyle fit, not random swipes.
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                Live soon
              </span>
            </div>

            <div className="mb-6 flex-1 rounded-xl border border-white/6 bg-zinc-950/40 p-5">
              <p className="text-sm font-medium text-zinc-300">
                No suggestions yet
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
                Complete your profile preferences and we will surface people who
                align on schedule, noise, and budget—then you can say hello in one
                tap.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-linear-to-r from-cyan-400 to-violet-400 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-[0_0_28px_-8px_rgba(34,211,238,0.45)] transition hover:brightness-110 min-[480px]:flex-none"
              >
                Polish your profile
              </Link>
              <Link
                to="/apartments"
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/12 bg-white/4 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:border-white/20 hover:bg-white/8 min-[480px]:flex-none"
              >
                Browse listings
              </Link>
            </div>
          </div>
        </div>

        {/* Side column */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          {/* Messages */}
          <div className="rounded-[1.25rem] border border-white/8 bg-white/3 p-6 transition hover:border-white/14">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-zinc-950/50 text-zinc-300">
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
                <h2 className="font-semibold text-white">Messages</h2>
                <p className="text-xs text-zinc-500">One inbox for roommate chat</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              When you match, threads land here—no scattered apps or forgotten
              replies.
            </p>
            <p className="mt-4 rounded-lg border border-dashed border-white/8 bg-zinc-950/30 px-3 py-3 text-center text-xs text-zinc-500">
              Inbox connects after your first match
            </p>
          </div>

          {/* Profile */}
          <div className="rounded-[1.25rem] border border-white/8 bg-white/3 p-6 transition hover:border-white/14">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-zinc-950/50 text-violet-200/90">
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
                <h2 className="font-semibold text-white">Profile & preferences</h2>
                <p className="text-xs text-zinc-500">What drives your matches</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              Sleep, noise, guests, pets—small edits here sharpen who we suggest
              next.
            </p>
            <Link
              to="/register"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/10 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-white/6"
            >
              Review signup answers
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom strip */}
      <aside className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[1.25rem] border border-white/6 bg-linear-to-r from-zinc-950/80 via-zinc-900/40 to-zinc-950/80 p-6 sm:flex-row sm:items-center sm:p-7">
        <div>
          <p className="text-sm font-semibold text-white">Hunting for the flat?</p>
          <p className="mt-1 text-sm text-zinc-500">
            Filter by city and budget, then shortlist with a roommate in mind.
          </p>
        </div>
        <Link
          to="/apartments"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white/8 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/10 transition hover:bg-white/12"
        >
          Open listings
          <svg
            className="h-4 w-4 text-zinc-400"
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
