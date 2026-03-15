import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiCpu, FiDatabase, FiLayers, FiServer } from 'react-icons/fi'
import {
  SiArgo,
  SiDocker,
  SiFastapi,
  SiGit,
  SiGnubash,
  SiGrafana,
  SiHelm,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPrometheus,
  SiPython,
  SiRabbitmq,
  SiRedis,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'

const groups = [
  {
    title: 'Programming',
    icon: FiCpu,
    accent: 'from-sky-400/20 via-fuchsia-400/12 to-emerald-400/10',
    items: [
      { label: 'Python', icon: SiPython, tint: 'text-sky-200' },
      { label: 'JavaScript', icon: SiJavascript, tint: 'text-amber-200' },
      { label: 'Bash', icon: SiGnubash, tint: 'text-emerald-200' },
    ],
  },
  {
    title: 'Backend',
    icon: FiServer,
    accent: 'from-fuchsia-400/18 via-sky-400/10 to-white/5',
    items: [
      { label: 'Node.js', icon: SiNodedotjs, tint: 'text-emerald-200' },
      { label: 'FastAPI', icon: SiFastapi, tint: 'text-teal-200' },
      { label: 'REST APIs', icon: FiLayers, tint: 'text-zinc-200' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: FiLayers,
    accent: 'from-sky-400/18 via-fuchsia-400/10 to-emerald-400/10',
    items: [
      { label: 'AWS', icon: FaAws, tint: 'text-amber-200' },
      { label: 'EKS', icon: FaAws, tint: 'text-amber-200' },
      { label: 'Docker', icon: SiDocker, tint: 'text-sky-200' },
      { label: 'Kubernetes', icon: SiKubernetes, tint: 'text-sky-200' },
      { label: 'Helm', icon: SiHelm, tint: 'text-sky-200' },
      { label: 'Argo CD', icon: SiArgo, tint: 'text-sky-200' },
      { label: 'Prometheus', icon: SiPrometheus, tint: 'text-rose-200' },
      { label: 'Grafana', icon: SiGrafana, tint: 'text-amber-200' },
      { label: 'Git', icon: SiGit, tint: 'text-orange-200' },
    ],
  },
  {
    title: 'Data & Messaging',
    icon: FiDatabase,
    accent: 'from-emerald-400/16 via-sky-400/10 to-fuchsia-400/10',
    items: [
      { label: 'MongoDB', icon: SiMongodb, tint: 'text-emerald-200' },
      { label: 'MySQL', icon: SiMysql, tint: 'text-sky-200' },
      { label: 'Redis', icon: SiRedis, tint: 'text-rose-200' },
      { label: 'RabbitMQ', icon: SiRabbitmq, tint: 'text-amber-200' },
    ],
  },
]

function SkillPill({ label, icon: Icon, tint }) {
  return (
    <div className="group holo-chip inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium text-zinc-200 transition hover:bg-[#0b1020]/65">
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-xl border border-white/10 bg-white/5 ${tint}`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </div>
  )
}

export default function Skills() {
  const reduceMotion = useReducedMotion()
  const [activeGroup, setActiveGroup] = useState(groups[0].title)

  const container = {
    hidden: {},
    show: {
      transition: reduceMotion ? {} : { staggerChildren: 0.08 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="skills" className="section-frame scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="section-kicker">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300/80" />
              Skills
            </div>
            <h2 className="section-title max-w-3xl">Tools I use to ship reliable systems.</h2>
          </div>
          <div className="holo-chip hidden rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] text-zinc-500 md:block">
            Cloud | Platform | Observability
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-6 grid gap-4 md:grid-cols-2"
        >
          {groups.map((group) => {
            const Icon = group.icon
            const isActive = activeGroup === group.title

            return (
              <motion.div
                key={group.title}
                variants={item}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                onMouseEnter={() => setActiveGroup(group.title)}
                onFocus={() => setActiveGroup(group.title)}
                onClick={() => setActiveGroup(group.title)}
                tabIndex={0}
                className={`group glass-card depth-card relative cursor-pointer overflow-hidden rounded-[1.8rem] p-5 md:p-6 ${
                  isActive
                    ? 'border-sky-300/25 bg-white/8 shadow-[0_24px_60px_rgba(15,23,42,0.28),0_0_0_1px_rgba(125,211,252,0.08)]'
                    : ''
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${group.accent} transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-[radial-gradient(600px_220px_at_30%_0%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(700px_260px_at_90%_10%,rgba(168,85,247,0.10),transparent_60%)] transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                />

                <div className="relative flex items-center gap-3">
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1 transition duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-sky-400/24 to-fuchsia-400/16 ring-sky-200/25'
                        : 'bg-gradient-to-br from-sky-400/15 to-fuchsia-400/10 ring-white/10'
                    }`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white">{group.title}</div>
                    <div className={`text-xs transition-colors duration-300 ${isActive ? 'text-sky-100/80' : 'text-zinc-400'}`}>
                      {group.items.length} skills
                    </div>
                  </div>
                </div>

                <div className="relative mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <SkillPill key={item.label} label={item.label} icon={item.icon} tint={item.tint} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
