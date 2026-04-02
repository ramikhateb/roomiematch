import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-5 py-14 sm:px-6 sm:py-20">
      <div className="relative">
        <div className="absolute -inset-1 rounded-[1.75rem] bg-gradient-to-br from-cyan-400/15 via-transparent to-violet-400/15 blur-xl" />
        <div className="relative rounded-[1.75rem] border border-white/[0.08] bg-white/[0.03] p-8 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-9">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Sign in to pick up where you left off—matches, messages, and saved
            listings stay in sync.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="login-email"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-xl border border-white/[0.1] bg-zinc-950/60 px-4 py-3 text-sm text-white outline-none ring-cyan-400/40 placeholder:text-zinc-600 focus:border-cyan-400/35 focus:ring-2"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="Your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/[0.1] bg-zinc-950/60 px-4 py-3 text-sm text-white outline-none ring-cyan-400/40 placeholder:text-zinc-600 focus:border-cyan-400/35 focus:ring-2"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_0_28px_-6px_rgba(34,211,238,0.45)] transition hover:brightness-110"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            New here?{' '}
            <Link
              to="/register"
              className="font-semibold text-cyan-300/90 underline-offset-4 hover:text-cyan-200 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
