import { motion, useReducedMotion } from 'framer-motion'
import { FiAward, FiStar, FiTrendingUp } from 'react-icons/fi'

const achievements = [
  {
    icon: FiTrendingUp,
    title: 'Built GitOps workflow for Kubernetes',
    detail: 'Designed repeatable environment promotion using Argo CD and Helm with safer rollout control.',
    tag: 'Platform',
  },
  {
    icon: FiStar,
    title: 'Distributed systems project delivery',
    detail: 'Implemented message-driven real-time architecture using RabbitMQ, Redis, and MongoDB.',
    tag: 'Systems',
  },
  {
    icon: FiAward,
    title: 'Open source / community milestone',
    detail: 'Keep this card for your strongest measurable win: merged PRs, talks, hackathon, or leadership work.',
    tag: 'Impact',
  },
]

export default function Achievements() {
  const reduceMotion = useReducedMotion()

  const container = {
    hidden: {},
    show: { transition: reduceMotion ? {} : { staggerChildren: 0.08 } },
  }
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="achievements" className="section-frame scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div>
          <div className="section-kicker">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
            Achievements
          </div>
          <h2 className="section-title max-w-3xl">
            Proof of execution, framed to read quickly on any screen.
          </h2>
          <p className="section-copy text-sm md:text-base">
            These cards now scan more clearly on mobile and desktop, with stronger hierarchy and
            less visual drift from the rest of the site.
          </p>
        </div>

        <div className="glass-card depth-card mt-10 rounded-[2rem] p-4 md:p-5">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-4 lg:grid-cols-3"
          >
            {achievements.map((achievement) => {
              const Icon = achievement.icon

              return (
                <motion.article
                  key={achievement.title}
                  variants={item}
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="holo-panel rounded-[1.8rem] p-5 md:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(16,185,129,0.18),rgba(34,211,238,0.12))] ring-1 ring-white/10">
                      <Icon className="h-5 w-5 text-zinc-100" />
                    </div>
                    <span className="holo-chip rounded-full px-3 py-1 text-xs font-medium text-zinc-200">
                      {achievement.tag}
                    </span>
                  </div>

                  <div className="mt-5 text-base font-semibold text-white">{achievement.title}</div>
                  <div className="mt-2 text-sm leading-7 text-zinc-400">{achievement.detail}</div>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
