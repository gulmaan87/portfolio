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
  FiSend,
  FiMenu,
  FiX
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
  const [isOpen, setIsOpen] = useState(false)
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
    setIsOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="fixed left-6 bottom-8 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 z-[1000] flex flex-col items-start gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, scale: 0.9, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            className="glass-card depth-card flex flex-col items-center gap-2 rounded-[2.5rem] p-3 shadow-[0_24px_64px_rgba(0,0,0,0.5)] bg-[#0a0c14]/90 backdrop-blur-2xl border-white/10"
          >
            <div className="flex flex-col gap-1.5 max-h-[70vh] overflow-y-auto no-scrollbar py-2">
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
                      className={`relative isolate flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                        isActive ? 'text-cyan-300' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                      aria-label={`Scroll to ${link.label}`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-dock-active"
                          className="absolute inset-0 -z-10 rounded-2xl border border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                        />
                      )}
                      <Icon className="h-5 w-5 relative z-10 shrink-0" />
                    </button>

                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="absolute left-16 whitespace-nowrap"
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
          </motion.nav>
        )}
      </AnimatePresence>

      {/* 3-Line Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center justify-center transition-all duration-300 active:scale-90 border border-white/10 ${
          isOpen 
            ? 'bg-zinc-800 text-white' 
            : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
        }`}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
    </div>
  )
}
