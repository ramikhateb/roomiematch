import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function MainLayout() {
  return (
    <div className="relative min-h-screen bg-[#07070c] font-sans text-zinc-100 antialiased">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[38%] left-1/2 h-[min(90vh,920px)] w-[min(140vw,1600px)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.16),transparent_62%)]" />
        <div className="absolute -bottom-[20%] -right-[15%] h-[min(70vh,700px)] w-[min(85vw,900px)] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.1),transparent_58%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,12,0)_0%,rgba(7,7,12,0.55)_100%)]" />
      </div>

      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
