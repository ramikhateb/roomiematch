import { motion, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { getCurrentUser } from '../services/authService'

const MotionJoinLink = motion(Link)

function Navbar() {
  const reduceMotion = useReducedMotion()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const currentUser = getCurrentUser()
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200',
      isActive
        ? 'bg-slate-900 text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
        >
          {isHome ? (
            <Star
              className="h-5 w-5 shrink-0 text-amber-500 sm:h-5 sm:w-5"
              fill="currentColor"
              strokeWidth={1.5}
              aria-hidden
            />
          ) : null}
          <span className="bg-linear-to-r from-cyan-600 via-slate-900 to-violet-600 bg-clip-text text-transparent">
            RoomieMatch
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-0.5">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/apartments" className={navLinkClass}>
            Apartments
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          {currentUser ? (
            <>
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
              <span className="ml-1 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800">
                {currentUser.fullName.split(' ')[0]}
              </span>
            </>
          ) : (
            <>
              <span className="mx-1 hidden h-4 w-px bg-slate-300 sm:block" />
              <NavLink to="/login" className={navLinkClass}>
                Sign in
              </NavLink>
              <MotionJoinLink
                to="/register"
                whileHover={
                  reduceMotion
                    ? undefined
                    : { scale: 1.04, filter: 'brightness(1.06)' }
                }
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 520, damping: 24 }}
                className="ml-0.5 rounded-full bg-linear-to-r from-cyan-500 to-violet-500 px-3.5 py-1.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(14,116,144,0.45)] sm:ml-1"
              >
                Join
              </MotionJoinLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
