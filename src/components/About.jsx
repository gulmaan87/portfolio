import { motion, useReducedMotion } from 'framer-motion'
import { FiCloud, FiGitBranch, FiLayers } from 'react-icons/fi'

const cards = [
  {
    icon: FiCloud,
    title: 'Cloud-first platforms',
    eyebrow: 'Architecture',
    desc: 'AWS-native patterns, secure defaults, and infrastructure that stays understandable as it scales.',
  },
  {
    icon: FiGitBranch,
    title: 'GitOps delivery',
    eyebrow: 'Release flow',
    desc: 'Declarative rollouts, repeatable environments, and operational changes that remain reviewable.',
  },
  {
    icon: FiLayers,
    title: 'Distributed systems',
    eyebrow: 'Systems design',
    desc: 'Event-driven services, messaging pipelines, and backend paths designed for resilience.',
  },
]

export default function About() {
  const reduceMotion = useReducedMotion()

  const fade = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="section-frame scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="glass-card depth-card rounded-[2rem] p-6 md:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
            <div className="section-kicker">
              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-300/80" />
              About
            </div>
            <h2 className="section-title max-w-2xl">
              Systems thinking, but translated into real operational decisions.
            </h2>
            <p className="section-copy text-sm leading-8 md:text-base">
              I am a Computer Science undergraduate focused on cloud infrastructure, DevOps
              automation, and distributed systems. The work I enjoy most is taking abstract
              production requirements and turning them into delivery systems people can actually
              trust.
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-zinc-400 md:text-base">
              That usually means clear deployment mechanics, observable runtime behavior, and fewer
              surprises when systems move from local success to production traffic.
            </p>
            </div>

            <div className="grid gap-4">
              {cards.map((card) => {
                const Icon = card.icon

                return (
                  <div key={card.title} className="holo-panel rounded-[1.6rem] p-5">
                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(244,114,182,0.12))] ring-1 ring-white/10 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                          {card.eyebrow}
                        </div>
                        <div className="mt-2 text-lg font-semibold text-white">{card.title}</div>
                        <div className="mt-2 text-sm leading-7 text-zinc-400">{card.desc}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
