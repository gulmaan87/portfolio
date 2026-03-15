import { motion, useReducedMotion } from 'framer-motion'
import { FiAward, FiCheckCircle, FiClock, FiExternalLink } from 'react-icons/fi'

const certs = [
  {
    name: 'AWS Academy Graduate – Cloud Architecting',
    issuer: 'Amazon Web Services',
    status: 'Issued',
    year: '2026',
    link: 'https://www.credly.com/go/B9AYcVuj',
    track: 'Cloud Architecture',
  },
  {
    name: 'HackerRank: SQL (Advanced)',
    issuer: 'HackerRank',
    status: 'Issued',
    year: '2025',
    link: 'https://www.hackerrank.com/certificates/9bfaa63c3d92',
    track: 'Data & Databases',
  },
  {
    name: 'HackerRank: Python (Basic)',
    issuer: 'HackerRank',
    status: 'Issued',
    year: '2025',
    link: 'https://www.hackerrank.com/certificates/d2120b4dbd2b',
    track: 'Programming',
  },
  {
    name: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services',
    status: 'Planned',
    year: '2026',
    link: '',
    track: 'Cloud Architecture',
  },
]

export default function Certifications() {
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
    <section id="certifications" className="section-frame scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="section-kicker">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
              Certifications
            </div>
            <h2 className="section-title max-w-3xl">
              Professional benchmarks and technical certifications.
            </h2>
            <p className="section-copy text-sm md:text-base">
              A record of validated skills across cloud architecture, databases, and core programming.
            </p>
          </div>

          <div className="holo-chip hidden items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.22em] text-zinc-500 md:flex">
            <FiAward className="h-4 w-4" />
            Cloud • Data • Code
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10"
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {certs.map((cert) => (
              <motion.article
                key={cert.name}
                variants={item}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="holo-panel flex flex-col justify-between rounded-[1.8rem] border-amber-200/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05))] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
              >
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ring-white/10 ${
                      cert.status === 'Issued' 
                        ? 'bg-gradient-to-br from-emerald-400/30 to-teal-400/20' 
                        : 'bg-gradient-to-br from-amber-300/30 to-fuchsia-300/20'
                    }`}>
                      {cert.status === 'Issued' ? (
                        <FiCheckCircle className="h-5 w-5 text-emerald-300" />
                      ) : (
                        <FiClock className="h-5 w-5 text-amber-200" />
                      )}
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-[11px] font-medium ${
                      cert.status === 'Issued'
                        ? 'border-emerald-300/20 bg-emerald-300/10 text-emerald-200'
                        : 'border-amber-300/20 bg-amber-300/10 text-amber-200'
                    }`}>
                      {cert.status}
                    </span>
                  </div>

                  <div className="mt-8">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-amber-100/70">
                      {cert.issuer}
                    </div>
                    <div className="mt-3 text-lg font-semibold leading-snug text-white line-clamp-2 min-h-[3.5rem]">{cert.name}</div>
                    <div className="holo-chip mt-4 inline-flex rounded-full px-3 py-1 text-xs font-medium text-zinc-200">
                      {cert.track}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mt-8 flex items-end justify-between gap-4 border-t border-white/10 pt-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                        {cert.status === 'Issued' ? 'Issued' : 'Target'}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-zinc-100">{cert.year}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                        Track
                      </div>
                      <div className="mt-1 text-sm font-medium text-zinc-300">{cert.track}</div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    {cert.link ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="holo-panel inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-100 transition hover:bg-white/10"
                        aria-label="Verify certification"
                        title="Verify"
                      >
                        Verify
                        <FiExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <div className="holo-panel inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-500 cursor-not-allowed">
                        {cert.status === 'Issued' ? 'Verify' : 'View'}
                        <FiExternalLink className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

