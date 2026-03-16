import { motion, useReducedMotion } from 'framer-motion'
import { FiBookOpen, FiCalendar, FiMapPin } from 'react-icons/fi'

const education = [
  {
    degree: 'Bachelor of Technology (CSE)',
    school: 'Lovely Professional University',
    location: 'Punjab, India',
    period: 'Aug 2023 - Present',
    highlights: [
      'CGPA: 6.39',
      'Focus: cloud infrastructure, DevOps automation, and distributed systems',
      'Core areas: operating systems, networking, databases, and system design',
    ],
  },
  {
    degree: 'Intermediate',
    school: 'T.R.N.S.S.I.C',
    location: 'Jagdishpur, Pratapgarh, Uttar Pradesh',
    period: 'May 2020 - Feb 2021',
    highlights: [
      'Percentage: 78.4%',
      'Focused on science and mathematics fundamentals',
    ],
  },
  {
    degree: 'Matriculation',
    school: 'S.J.S. Public School',
    location: 'Amethi, Uttar Pradesh',
    period: 'Apr 2016 - Mar 2017',
    highlights: [
      'CGPA: 8.0',
      'Foundational education with strong academic performance',
    ],
  },
]

export default function Education() {
  const reduceMotion = useReducedMotion()

  const fade = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="education" className="section-frame scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div>
          <div className="section-kicker">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-300/80" />
            Education
          </div>
          <h2 className="section-title max-w-3xl">
            Computer science fundamentals with a platform-engineering lens.
          </h2>
          <p className="section-copy text-sm md:text-base">
            The academic foundation here supports the kind of work shown elsewhere in the portfolio:
            systems, reliability, and the infrastructure behind scalable software.
          </p>
        </div>

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          {education.map((item) => (
            <div
              key={`${item.school}-${item.degree}`}
              className="glass-card depth-card rounded-[2rem] p-5 md:p-7"
            >
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="min-w-0">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(244,114,182,0.12))] ring-1 ring-white/10">
                      <FiBookOpen className="h-5 w-5 text-zinc-100" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-lg font-semibold text-white">{item.degree}</div>
                      <div className="mt-1 text-sm text-zinc-400">{item.school}</div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                    <span className="holo-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5">
                      <FiCalendar className="h-4 w-4" />
                      {item.period}
                    </span>
                    <span className="holo-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5">
                      <FiMapPin className="h-4 w-4" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="holo-panel rounded-[1.5rem] p-5">
                  <div className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                    Highlights
                  </div>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-300">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
