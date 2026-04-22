import { motion, useReducedMotion } from 'framer-motion'
import MotionLink from '../components/motion/MotionLink'

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

const featureContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
}

const featureItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 380, damping: 28 },
  },
}

function HomePage() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
      <section className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <motion.div variants={heroContainer} initial="hidden" animate="show">
          <motion.p
            variants={heroItem}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600"
          >
            Lifestyle-first matching
          </motion.p>

          <motion.h1
            variants={heroItem}
            className="mb-6 text-[2.35rem] font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.05]"
          >
            A roommate who fits{' '}
            <span className="bg-linear-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
              how you live
            </span>
            , not just your rent.
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mb-9 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8"
          >
            We pair you on routines, noise, cleanliness, budget, and neighborhood—so
            moving in feels like a step forward, not a dice roll.
          </motion.p>

          <motion.div variants={heroItem} className="flex flex-wrap items-center gap-3">
            <MotionLink
              to="/register"
              className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-cyan-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_-14px_rgba(8,145,178,0.5)] transition hover:brightness-110"
            >
              Create your profile
            </MotionLink>

            <MotionLink
              to="/login"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
            >
              I already have an account
            </MotionLink>
          </motion.div>

          <motion.p variants={heroItem} className="mt-8 text-xs text-slate-500">
            No spammy listings—just clearer signals and smarter introductions.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
        >
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
        </motion.div>
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

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={featureContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
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
            <motion.div
              key={item.title}
              variants={featureItem}
              whileHover={
                reduceMotion ? undefined : { y: -4, scale: 1.02 }
              }
              transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.12)] transition-colors hover:border-slate-300 hover:bg-white hover:shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)]"
            >
              <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500/20 to-violet-500/20 text-xs font-bold text-cyan-700">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  )
}

export default HomePage
