import { useMemo, useState } from 'react'
import { FiCompass, FiLayers, FiSend, FiShuffle } from 'react-icons/fi'
import './FloatingDock.css'

const actions = [
  { id: 'projects', label: 'Projects', icon: FiLayers },
  { id: 'architecture', label: 'Architecture', icon: FiCompass },
  { id: 'contact', label: 'Contact', icon: FiSend },
]

const surpriseTargets = ['about', 'skills', 'certifications', 'projects', 'architecture', 'contact']

export default function FloatingDock() {
  const [open, setOpen] = useState(false)
  const randomTargets = useMemo(() => surpriseTargets, [])

  const jumpTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const jumpSurprise = () => {
    const next = randomTargets[Math.floor(Math.random() * randomTargets.length)] ?? 'projects'
    jumpTo(next)
  }

  return (
    <div className={`floating-dock ${open ? 'open' : ''}`}>
      <div className="floating-dock__menu">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => jumpTo(action.id)}
              className="floating-dock__action holo-chip inline-flex items-center gap-2 text-sm"
            >
              <Icon className="h-4 w-4" />
              {action.label}
            </button>
          )
        })}

        <button
          type="button"
          onClick={jumpSurprise}
          className="floating-dock__action aurora-button aurora-button--accent min-h-0 inline-flex items-center gap-2 px-[18px] py-[10px] text-sm"
        >
          <FiShuffle className="h-4 w-4" />
          Surprise me
        </button>
      </div>

      <button
        type="button"
        className="floating-dock__toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close floating dock' : 'Open floating dock'}
      >
        {open ? 'x' : '☰'}
      </button>
    </div>
  )
}
