import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-white font-semibold'
      : 'text-slate-300 hover:text-white transition'

  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          RoomieMatch
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/login" className={navLinkClass}>
            Login
          </NavLink>
          <NavLink to="/register" className={navLinkClass}>
            Register
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/apartments" className={navLinkClass}>
            Apartments
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar