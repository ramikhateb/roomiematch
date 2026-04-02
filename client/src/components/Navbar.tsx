import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200',
      isActive
        ? 'bg-white/10 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]'
        : 'text-zinc-400 hover:bg-white/6 hover:text-zinc-100',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-[#07070c]/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-white sm:text-xl"
        >
          <span className="bg-linear-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
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
          <span className="mx-1 hidden h-4 w-px bg-white/10 sm:block" />
          <NavLink to="/login" className={navLinkClass}>
            Sign in
          </NavLink>
          <NavLink
            to="/register"
            className="ml-0.5 rounded-full bg-linear-to-r from-cyan-400 to-violet-400 px-3.5 py-1.5 text-sm font-semibold text-zinc-950 shadow-[0_0_24px_-4px_rgba(34,211,238,0.45)] transition hover:brightness-110 sm:ml-1"
          >
            Join
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
