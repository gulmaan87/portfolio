import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FiActivity,
  FiDatabase,
  FiGitBranch,
  FiLayers,
  FiMessageCircle,
  FiMonitor,
  FiRadio,
  FiRepeat,
  FiServer,
  FiShield,
} from 'react-icons/fi'

const chatBadges = [
  'React Client -> API Server -> Socket Gateway',
  'RabbitMQ -> Worker -> MongoDB',
]

const devopsBadges = [
  'GitHub -> Argo CD -> Helm',
  'Kubernetes -> AWS EKS -> Prometheus + Grafana',
]

const qualities = [
  {
    title: 'Scalability',
    desc: 'Horizontal scaling with microservices and queues.',
    icon: FiGitBranch,
  },
  {
    title: 'Resilience',
    desc: 'Fault-tolerant distributed systems with graceful degradation.',
    icon: FiShield,
  },
  {
    title: 'Observability',
    desc: 'Metrics, logs, dashboards, and alerting end to end.',
    icon: FiActivity,
  },
  {
    title: 'Automation',
    desc: 'GitOps workflows and progressive delivery.',
    icon: FiRepeat,
  },
]

const diagrams = {
  chat: {
    title: 'Chat System Architecture',
    subtitle: 'Structured real-time messaging topology with queue-backed processing.',
    badges: chatBadges,
    nodes: [
      { id: 'client', label: 'React Client', x: 18, y: 22, icon: FiMonitor },
      { id: 'api', label: 'API Server', x: 40, y: 22, icon: FiServer },
      { id: 'socket', label: 'Socket Gateway', x: 62, y: 22, icon: FiRadio },
      { id: 'mq', label: 'RabbitMQ', x: 40, y: 52, icon: FiLayers },
      { id: 'worker', label: 'Worker', x: 24, y: 80, icon: FiRepeat },
      { id: 'db', label: 'MongoDB', x: 56, y: 80, icon: FiDatabase },
    ],
    edges: [
      ['client', 'api'],
      ['api', 'socket'],
      ['api', 'mq'],
      ['mq', 'worker'],
      ['mq', 'db'],
    ],
  },
  devops: {
    title: 'DevOps Platform Architecture',
    subtitle: 'GitOps delivery path with a cleaner centralized deployment topology.',
    badges: devopsBadges,
    nodes: [
      { id: 'gh', label: 'GitHub', x: 18, y: 22, icon: FiGitBranch },
      { id: 'argo', label: 'Argo CD', x: 40, y: 22, icon: FiRepeat },
      { id: 'helm', label: 'Helm', x: 62, y: 22, icon: FiLayers },
      { id: 'k8s', label: 'Kubernetes', x: 40, y: 52, icon: FiServer },
      { id: 'eks', label: 'AWS EKS', x: 24, y: 80, icon: FiShield },
      { id: 'obs', label: 'Prometheus + Grafana', x: 56, y: 80, icon: FiActivity },
    ],
    edges: [
      ['gh', 'argo'],
      ['argo', 'helm'],
      ['argo', 'k8s'],
      ['k8s', 'eks'],
      ['k8s', 'obs'],
    ],
  },
}

function CyberDiagram({ diagram, reduceMotion }) {
  const nodeMap = new Map(diagram.nodes.map((node) => [node.id, node]))
  const lines = diagram.edges.map(([a, b]) => {
    const first = nodeMap.get(a)
    const second = nodeMap.get(b)
    return { id: `${a}-${b}`, x1: first.x, y1: first.y, x2: second.x, y2: second.y }
  })

  return (
    <div className="relative mx-auto h-[350px] w-full max-w-[700px] overflow-hidden rounded-[20px] border border-cyan-400/20 bg-[#04060f] p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_24px_60px_rgba(0,0,0,0.28)]">
      <div className="pointer-events-none absolute inset-0 opacity-100 [background-image:linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,234,255,0.08),transparent_38%)]" />

      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {lines.map((line) => (
          <motion.line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#00eaff"
            strokeWidth="0.45"
            strokeDasharray="4 6"
            initial={false}
            animate={reduceMotion ? { strokeDashoffset: 0 } : { strokeDashoffset: [100, 0] }}
            transition={
              reduceMotion
                ? { duration: 0.01 }
                : { duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'linear' }
            }
            opacity={0.95}
          />
        ))}
      </svg>

      {diagram.nodes.map((node, index) => {
        const Icon = node.icon

        return (
          <motion.div
            key={node.id}
            className="absolute"
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.25, delay: reduceMotion ? 0 : index * 0.03 }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#00eaff] bg-[rgba(0,255,255,0.08)] text-[#00eaff] shadow-[0_0_10px_#00eaff,0_0_30px_rgba(0,234,255,0.4)]">
                <Icon className="h-4 w-4" />
              </div>
              <div className="text-center text-[12px] uppercase tracking-[0.08em] text-[#00eaff]">
                {node.label}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function ArchitectureCard({ variant }) {
  const reduceMotion = useReducedMotion()
  const diagram = diagrams[variant]

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: 'spring', stiffness: 240, damping: 24 }}
      className="glass-card depth-card rounded-[1.9rem] p-5 md:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="holo-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-zinc-200">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-300/25">
              <FiMessageCircle className="h-3.5 w-3.5" />
            </span>
            {diagram.title}
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-300">{diagram.subtitle}</p>
        </div>
        <div className="holo-chip inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-[11px] text-cyan-200">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
          Flow active
        </div>
      </div>

      <div className="mt-6">
        <CyberDiagram diagram={diagram} reduceMotion={reduceMotion} />

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {diagram.badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/8 px-3 py-1.5 text-[11px] uppercase tracking-[0.08em] text-cyan-200"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default function Architecture() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState('chat')

  const fade = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="architecture" className="section-frame scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-kicker">
              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-300/80" />
              Architecture
            </div>
            <h2 className="section-title max-w-3xl">Clear, composable system design.</h2>
            <p className="section-copy text-sm md:text-base">
              The diagram is now structured like a minimal cyber-grid dashboard with centered nodes
              and clean flow lines.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.keys(diagrams).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active === key
                    ? 'aurora-button aurora-button--accent min-h-0'
                    : 'holo-chip text-zinc-300 hover:bg-white/10'
                }`}
              >
                {diagrams[key].title}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-8 lg:hidden"
        >
          <ArchitectureCard variant={active} />
        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-10 hidden gap-5 lg:grid lg:grid-cols-2"
        >
          <ArchitectureCard variant="chat" />
          <ArchitectureCard variant="devops" />
        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.1 }}
          className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {qualities.map((quality) => {
            const Icon = quality.icon
            return (
              <motion.div
                key={quality.title}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="glass-card depth-card rounded-[1.7rem] p-5 text-sm text-zinc-200"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/20 to-fuchsia-400/15 text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="mt-3 text-base font-semibold text-white">{quality.title}</div>
                <div className="mt-2 text-sm leading-7 text-zinc-400">{quality.desc}</div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
