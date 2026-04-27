import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'

const pageTransition = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

function MainLayout() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen bg-(--color-bg-page) font-sans text-slate-900 antialiased">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[38%] left-1/2 h-[min(90vh,920px)] w-[min(140vw,1600px)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1),transparent_62%)]" />
        <div className="absolute -bottom-[20%] -right-[15%] h-[min(70vh,700px)] w-[min(85vw,900px)] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.09),transparent_58%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0)_0%,rgba(248,250,252,0.8)_100%)]" />
      </div>

      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={pageTransition.initial}
              animate={pageTransition.animate}
              exit={pageTransition.exit}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] as const }}
              className="pb-10 sm:pb-14"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default MainLayout
