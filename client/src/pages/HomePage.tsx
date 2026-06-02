import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import MotionLink from '../components/motion/MotionLink'
import { getCurrentUser } from '../services/authService'

const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function HomePage() {
  const reduceMotion = useReducedMotion()
  const currentUser = getCurrentUser()

  return (
    <div className="page-shell max-w-6xl pb-12">
      <section className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
        <motion.div variants={heroContainer} initial="hidden" animate="show">
          <motion.p
            variants={heroItem}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 shadow-sm"
          >
            Roommate-first platform
          </motion.p>

          <motion.h1
            variants={heroItem}
            className="mb-5 text-[2.35rem] font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.05]"
          >
            A roommate who fits{' '}
            <span className="bg-linear-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
              how you live
            </span>
            , not just your rent.
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mb-8 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            Match on sleep, cleanliness, budget, and neighborhood—then browse real apartments on
            the map together.
          </motion.p>

          <motion.div variants={heroItem} className="flex flex-wrap items-center gap-3">
            {currentUser ? (
              <>
                <MotionLink
                  to="/dashboard"
                  className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-cyan-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_-14px_rgba(8,145,178,0.5)] transition hover:brightness-110"
                >
                  Open dashboard
                </MotionLink>
                <MotionLink
                  to="/apartments"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Browse apartments
                </MotionLink>
              </>
            ) : (
              <>
                <MotionLink
                  to="/register"
                  className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-cyan-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_-14px_rgba(8,145,178,0.5)] transition hover:brightness-110"
                >
                  Create your profile
                </MotionLink>
                <MotionLink
                  to="/login"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Sign in
                </MotionLink>
              </>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
        >
          <div className="absolute -inset-4 rounded-4xl bg-linear-to-br from-cyan-500/10 via-transparent to-violet-500/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/50">
            <div className="border-b border-slate-100 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-5 py-3.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">
                Live preview
              </p>
              <p className="mt-0.5 text-sm font-bold text-white">Compatibility snapshot</p>
            </div>
            <div className="space-y-2.5 p-5">
              {[
                { k: 'Rent band', v: '₪4,000–5,500 / mo' },
                { k: 'House style', v: 'Tidy · quiet evenings' },
                { k: 'Areas', v: 'Tel Aviv · Ramat Gan' },
              ].map((row) => (
                <div
                  key={row.k}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {row.k}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-slate-800">{row.v}</p>
                </div>
              ))}
              <p className="pt-1 text-center text-[11px] text-slate-500">
                Scores update as you refine filters on the dashboard
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="section-divider mt-16 sm:mt-20">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">
              How it works
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Three steps to a calmer move-in
            </h2>
          </div>
          <Link
            to={currentUser ? '/dashboard' : '/register'}
            className="text-sm font-semibold text-violet-700 hover:text-violet-800"
          >
            {currentUser ? 'Go to dashboard →' : 'Get started free →'}
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              step: '01',
              title: 'Build your profile',
              body: 'Set budget, sleep, pets, and the neighborhoods you actually want.',
            },
            {
              step: '02',
              title: 'Discover & search',
              body: 'Browse everyone shuffled in your feed, then filter when you are ready.',
            },
            {
              step: '03',
              title: 'Shortlist homes',
              body: 'Map real listings, save favorites, and align on rent together.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:border-cyan-200/60 hover:shadow-md"
            >
              <div className="border-b border-slate-100 bg-slate-50 px-4 py-2.5">
                <span className="text-xs font-bold text-cyan-700">{item.step}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-divider mt-14 grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Apartments on map', value: '10+' },
          { label: 'Preference signals', value: '12' },
          { label: 'Demo roommates', value: '10' },
        ].map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm"
          >
            <p className="text-2xl font-bold tracking-tight text-slate-900">{metric.value}</p>
            <p className="mt-1 text-xs font-medium text-slate-500">{metric.label}</p>
          </div>
        ))}
      </section>

      <section className="section-divider mt-14 overflow-hidden rounded-2xl border border-slate-200/80 bg-linear-to-r from-cyan-600 to-violet-600 p-px shadow-lg">
        <div className="rounded-[calc(1rem-1px)] bg-slate-900 px-6 py-8 text-center sm:px-10">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Ready to find your next roommate?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-300">
            Join RoomieMatch and explore real profiles with compatibility scores today.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <MotionLink
              to={currentUser ? '/dashboard' : '/register'}
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              className="inline-flex rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900"
            >
              {currentUser ? 'Open dashboard' : 'Create account'}
            </MotionLink>
            <MotionLink
              to="/apartments"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              className="inline-flex rounded-xl border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white"
            >
              View apartments
            </MotionLink>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
