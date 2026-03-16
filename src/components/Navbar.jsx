import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiHome, 
  FiUser, 
  FiBookOpen, 
  FiCpu, 
  FiAward, 
  FiCheckCircle, 
  FiFileText, 
  FiLayers, 
  FiCompass, 
  FiSend 
} from 'react-icons/fi'

const navLinks = [
  { id: 'home', label: 'Home', icon: FiHome },
  { id: 'about', label: 'About', icon: FiUser },
  { id: 'education', label: 'Education', icon: FiBookOpen },
  { id: 'skills', label: 'Skills', icon: FiCpu },
  { id: 'achievements', label: 'Achievements', icon: FiAward },
  { id: 'certifications', label: 'Certifications', icon: FiCheckCircle },
  { id: 'resume', label: 'Resume', icon: FiFileText },
  { id: 'projects', label: 'Projects', icon: FiLayers },
  { id: 'architecture', label: 'Architecture', icon: FiCompass },
  { id: 'contact', label: 'Contact', icon: FiSend },
]

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [hovered, setHovered] = useState(null)

  const linkItems = useMemo(() => navLinks, [])

  useEffect(() => {
    const nodes = linkItems.map((link) => document.getElementById(link.id)).filter(Boolean)
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))

        if (visible[0]?.target?.id) setActive(visible[0].target.id)
      },
      { threshold: [0.1, 0.2, 0.3], rootMargin: '-20% 0px -60% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [linkItems])

  const onNav = (id) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Desktop Vertical Left Dock - Fixed at the very edge */}
      <nav className="fixed left-4 top-1/2 z-[1000] -translate-y-1/2 hidden xl:flex flex-col gap-3">
        <div className="glass-card depth-card flex flex-col items-center gap-2 rounded-full p-2 py-4 shadow-[0_16px_48px_rgba(0,0,0,0.4)] bg-[#0a0c14]/80 backdrop-blur-xl border-white/10">
          {linkItems.map((link) => {
            const isActive = active === link.id
            const isHovered = hovered === link.id
            const Icon = link.icon

            return (
              <div key={link.id} className="relative flex items-center">
                <button
                  type="button"
                  onClick={() => onNav(link.id)}
                  onMouseEnter={() => setHovered(link.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative isolate flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                    isActive ? 'text-cyan-300' : 'text-zinc-400 hover:text-white'
                  }`}
                  aria-label={`Scroll to ${link.label}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-dock-active"
                      className="absolute inset-0 -z-10 rounded-full border border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <Icon className="h-5 w-5 relative z-10" />
                </button>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="absolute left-12 whitespace-nowrap"
                    >
                      <div className="rounded-lg border border-white/10 bg-[#0a0c14]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xl backdrop-blur-md">
                        {link.label}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </nav>

      {/* Mobile/Tablet Bottom Dock - Ensure it's not blocking content */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000] flex xl:hidden">
        <div className="glass-card depth-card flex items-center gap-1 rounded-full p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.5)] bg-[#0a0c14]/90 backdrop-blur-2xl border-white/10 max-w-[95vw] overflow-x-auto no-scrollbar">
          {linkItems.map((link) => {
            const isActive = active === link.id
            const Icon = link.icon

            return (
              <button
                key={link.id}
                type="button"
                onClick={() => onNav(link.id)}
                className={`relative isolate flex min-w-[40px] h-10 items-center justify-center rounded-full transition-all duration-300 ${
                  isActive ? 'text-cyan-300 px-4 gap-2 bg-white/5' : 'text-zinc-400'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-dock-active-mobile"
                    className="absolute inset-0 -z-10 rounded-full border border-cyan-300/30 bg-cyan-300/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <Icon className="h-5 w-5" />
                {isActive && (
                  <span className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">{link.label}</span>
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
