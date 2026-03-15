import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'resume', label: 'Resume' },
  { id: 'projects', label: 'Projects' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [hovered, setHovered] = useState(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  })

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
      { threshold: [0.2, 0.35, 0.5], rootMargin: '-18% 0px -65% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [linkItems])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onNav = (id) => {
    setOpen(false)
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="sticky top-0 z-[100] pt-4">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(5,6,10,0.92),rgba(5,6,10,0.18),rgba(5,6,10,0))]" />
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500"
        style={{ scaleX, transformOrigin: '0% 50%' }}
      />

      <div className="mx-auto max-w-7xl px-4">
        <div className="glass-card depth-card flex items-center justify-between gap-4 rounded-[1.75rem] px-4 py-3 shadow-[0_16px_48px_rgba(0,0,0,0.3)]">
          <button
            type="button"
            onClick={() => onNav('home')}
            className="group inline-flex items-center gap-3 text-left"
            aria-label="Go to home"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,145,178,0.18),rgba(37,99,235,0.12))]">
              <span className="signal-dot h-2.5 w-2.5 rounded-full bg-cyan-300 text-cyan-300" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-zinc-100">
                Mohd Gulman Meer
              </div>
              <div className="text-xs text-zinc-400">Cloud systems, delivery, observability</div>
            </div>
          </button>

          <nav
            className="hidden flex-1 items-center justify-end gap-1 md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {linkItems.map((link) => {
              const isActive = active === link.id
              const isHovered = hovered === link.id

              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNav(link.id)}
                  onMouseEnter={() => setHovered(link.id)}
                  className={`relative isolate rounded-full px-3.5 py-2 text-sm transition ${
                    isActive ? 'text-cyan-100' : isHovered ? 'text-white' : 'text-zinc-300'
                  }`}
                >
                  {(isActive || isHovered) && (
                    <motion.span
                      layoutId={isActive ? 'nav-pill-active' : undefined}
                      className={`absolute inset-0 -z-10 rounded-full border ${
                        isActive
                          ? 'border-cyan-300/25 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(37,99,235,0.16))] shadow-[0_0_24px_rgba(34,211,238,0.12)]'
                          : 'border-white/10 bg-white/6'
                      }`}
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              )
            })}
          </nav>

          <button
            type="button"
            className="holo-panel inline-flex items-center justify-center rounded-2xl p-2 text-zinc-200 hover:bg-white/10 md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-3 max-w-7xl px-4 md:hidden"
          >
            <div className="glass-card depth-card rounded-[1.75rem] p-3">
              {linkItems.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNav(link.id)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${
                    active === link.id
                      ? 'bg-cyan-300/10 text-cyan-100'
                      : 'text-zinc-200 hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {active === link.id ? (
                    <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  ) : (
                    <span className="text-zinc-600">/</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
