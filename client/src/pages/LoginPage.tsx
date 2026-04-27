import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import StatusCallout from '../components/StatusCallout'
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
    <div className="page-shell max-w-md">
      <div className="relative">
        <div className="absolute -inset-1 rounded-[1.75rem] bg-linear-to-br from-cyan-500/15 via-transparent to-violet-500/15 blur-xl" />
        <div className="panel relative p-8 sm:p-9">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Sign in to pick up where you left off—matches, messages, and saved
            apartments stay in sync.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <FormInput
              label="Email"
              name="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />

            <FormInput
              label="Password"
              name="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
            />

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
            <div className="mt-4">
              <StatusCallout tone="error">{error}</StatusCallout>
            </div>
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
