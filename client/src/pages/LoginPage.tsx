import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MotionButton from '../components/motion/MotionButton'
import { loginUser } from '../services/authService'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    try {
      setIsSubmitting(true)
      await loginUser({ email: email.trim(), password })
      navigate('/profile')
    } catch (err) {
      console.error(err)
      setError('Invalid email or password')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-5 py-14 sm:px-6 sm:py-20">
      <div className="relative">
        <div className="absolute -inset-1 rounded-[1.75rem] bg-linear-to-br from-cyan-500/15 via-transparent to-violet-500/15 blur-xl" />
        <div className="relative rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.22)] sm:p-9">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Sign in to pick up where you left off—matches, messages, and saved
            listings stay in sync.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="login-email"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-cyan-200 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-cyan-200 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2"
              />
            </div>

            <MotionButton
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full py-3.5 text-sm"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </MotionButton>
          </form>

          {error ? (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          ) : null}

          <p className="mt-6 text-center text-sm text-slate-500">
            New here?{' '}
            <Link
              to="/register"
              className="font-semibold text-cyan-700 underline-offset-4 hover:text-cyan-700 hover:underline"
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
