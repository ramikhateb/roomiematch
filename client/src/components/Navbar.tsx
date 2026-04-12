import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200',
      isActive
        ? 'bg-slate-900 text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
        >
          <span className="bg-linear-to-r from-cyan-600 via-slate-900 to-violet-600 bg-clip-text text-transparent">
            RoomieMatch
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-0.5">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/apartments" className={navLinkClass}>
            Listings
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/profile" className={navLinkClass}>
            Profile
          </NavLink>
          <span className="mx-1 hidden h-4 w-px bg-slate-300 sm:block" />
          <NavLink to="/login" className={navLinkClass}>
            Sign in
          </NavLink>
          <NavLink
            to="/register"
            className="ml-0.5 rounded-full bg-linear-to-r from-cyan-500 to-violet-500 px-3.5 py-1.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(14,116,144,0.45)] transition hover:brightness-110 sm:ml-1"
          >
            Join
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
