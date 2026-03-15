import { startTransition, useDeferredValue, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import k8sImg from '../assets/project-k8s.png'
import chatImg from '../assets/project-chat.png'

const filters = [
  { id: 'all', label: 'All builds' },
  { id: 'platform', label: 'Platform' },
  { id: 'systems', label: 'Distributed systems' },
]

const projects = [
  {
    title: 'Enterprise Kubernetes Platform',
    category: 'platform',
    description:
      'GitOps-driven Kubernetes platform on AWS EKS using Argo CD and Helm with blue-green deployments through Argo Rollouts and monitoring via Prometheus and Grafana.',
    stack: ['AWS', 'EKS', 'Argo CD', 'Helm', 'Argo Rollouts', 'Prometheus', 'Grafana'],
    image: k8sImg,
    github: 'https://github.com/',
    eyebrow: 'Platform case study',
    impact: ['GitOps-controlled delivery', 'Progressive rollout path', 'Centralized cluster observability'],
  },
  {
    title: 'Real-Time Distributed Chat Platform',
    category: 'systems',
    description:
      'Distributed real-time chat system built with React, Node.js, Socket.IO, RabbitMQ, Redis, and MongoDB with JWT authentication and Dockerized services.',
    stack: ['React', 'Node.js', 'Socket.IO', 'RabbitMQ', 'Redis', 'MongoDB', 'Docker', 'JWT'],
    image: chatImg,
    github: 'https://github.com/',
    eyebrow: 'Distributed systems case study',
    impact: ['Event-driven service communication', 'Real-time messaging path', 'Dockerized multi-service setup'],
  },
]

export default function Projects() {
  const reduceMotion = useReducedMotion()
  const [activeFilter, setActiveFilter] = useState('all')
  const deferredFilter = useDeferredValue(activeFilter)

  const visibleProjects = useMemo(() => {
    if (deferredFilter === 'all') return projects
    return projects.filter((project) => project.category === deferredFilter)
  }, [deferredFilter])

  return (
    <section id="projects" className="section-frame scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-kicker">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
              Projects
            </div>
            <h2 className="section-title max-w-3xl">
              Case studies that users can actively browse instead of passively skim.
            </h2>
            <p className="section-copy text-sm md:text-base">
              Filters make it easier to jump between platform work and distributed-systems work,
              especially on smaller screens where long pages become tiring.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() =>
                  startTransition(() => {
                    setActiveFilter(filter.id)
                  })
                }
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter.id
                    ? 'aurora-button aurora-button--accent min-h-0'
                    : 'holo-chip text-zinc-300 hover:bg-white/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6">
          {visibleProjects.map((project) => (
            <motion.article
              key={project.title}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="glass-card depth-card group relative overflow-hidden rounded-[2rem]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(700px_240px_at_15%_0%,rgba(34,211,238,0.12),transparent_55%),radial-gradient(760px_260px_at_100%_5%,rgba(244,114,182,0.11),transparent_58%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="border-b border-white/10 lg:border-r lg:border-b-0">
                  <div className="aspect-[16/10] overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-92 transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100"
                      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                      transition={{ duration: 0.35 }}
                    />
                  </div>
                </div>

                <div className="p-5 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.26em] text-zinc-500">
                        {project.eyebrow}
                      </div>
                      <h3 className="mt-3 text-xl font-semibold tracking-tight text-white md:text-2xl">
                        {project.title}
                      </h3>
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="holo-panel inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-zinc-200 transition hover:bg-white/10"
                      aria-label="GitHub link"
                      title="GitHub"
                    >
                      <FiGithub className="h-5 w-5" />
                    </a>
                  </div>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 md:text-base md:leading-8">
                    {project.description}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {project.impact.map((item, index) => (
                      <div
                        key={item}
                        className="holo-panel rounded-[1.35rem] px-4 py-4"
                      >
                        <div className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                          0{index + 1}
                        </div>
                        <div className="mt-2 text-sm font-medium leading-6 text-zinc-200">
                          {item}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="holo-chip rounded-full px-3 py-1.5 text-xs font-medium text-zinc-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <a href={project.github} target="_blank" rel="noreferrer" className="aurora-button aurora-button--accent">
                      Open repository
                      <FiArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
