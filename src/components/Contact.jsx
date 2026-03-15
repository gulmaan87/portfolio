import { motion, useReducedMotion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi'

const CONTACT = {
  email: 'mohdgulmanmeer@example.com',
  linkedin: 'https://www.linkedin.com/in/',
  github: 'https://github.com/',
}

const channels = [
  {
    label: 'Email',
    value: CONTACT.email,
    action: 'mailto',
    href: `mailto:${CONTACT.email}`,
    icon: FiMail,
  },
  {
    label: 'LinkedIn',
    value: 'Connect professionally',
    action: 'open',
    href: CONTACT.linkedin,
    icon: FiLinkedin,
  },
  {
    label: 'GitHub',
    value: 'See code and project context',
    action: 'open',
    href: CONTACT.github,
    icon: FiGithub,
  },
]

export default function Contact() {
  const reduceMotion = useReducedMotion()

  const fade = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: { opacity: 1, y: 0 },
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') || '')
    const email = String(form.get('email') || '')
    const message = String(form.get('message') || '')

    const subject = encodeURIComponent(`Portfolio contact: ${name || 'Hello'}`)
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section-frame scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="glass-card depth-card rounded-[2rem] p-4 md:p-5">
          <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="holo-panel rounded-[1.8rem] p-6 md:p-8"
          >
            <div className="section-kicker">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
              Contact
            </div>
            <h2 className="section-title max-w-xl">
              Built to make reaching out feel lightweight and direct.
            </h2>
            <p className="section-copy text-sm md:text-base">
              Reach out for cloud or platform roles, infrastructure work, or collaboration around
              distributed systems and deployment workflows.
            </p>

            <div className="holo-panel mt-8 rounded-[1.5rem] border-cyan-300/15 bg-cyan-300/8 p-5">
              <div className="text-[11px] uppercase tracking-[0.24em] text-cyan-100/70">
                Availability
              </div>
              <div className="mt-3 text-2xl font-semibold text-white">Open for serious work</div>
              <div className="mt-2 text-sm leading-7 text-zinc-300">
                Best fit: cloud, platform, DevOps, or backend-adjacent roles where reliability and
                delivery quality matter.
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {channels.map((channel) => {
                const Icon = channel.icon

                return (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="holo-panel rounded-[1.45rem] px-5 py-4 transition hover:bg-white/8"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b1020]/50 ring-1 ring-white/10">
                          <Icon className="h-5 w-5 text-zinc-100" />
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-white">{channel.label}</div>
                          <div className="text-sm text-zinc-400">{channel.value}</div>
                        </div>
                      </div>
                      <span className="holo-chip rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                        {channel.action}
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="holo-panel rounded-[1.8rem] p-6 md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                  Message console
                </div>
                <div className="mt-2 text-xl font-semibold text-white">Send a message</div>
              </div>
              <div className="holo-chip rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                mail client
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              This form is intentionally frictionless. It opens your email client directly and
              avoids a fake backend experience.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                    Name
                  </div>
                  <input
                    name="name"
                    required
                    className="holo-panel w-full rounded-[1.2rem] bg-[#0b1020]/55 px-4 py-3.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-cyan-300/30 focus:ring-2 focus:ring-cyan-300/10"
                    placeholder="Your name"
                  />
                </label>
                <label className="space-y-2">
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                    Email
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="holo-panel w-full rounded-[1.2rem] bg-[#0b1020]/55 px-4 py-3.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-rose-300/30 focus:ring-2 focus:ring-rose-300/10"
                    placeholder="you@domain.com"
                  />
                </label>
              </div>

              <label className="space-y-2">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                  Message
                </div>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="holo-panel w-full resize-none rounded-[1.2rem] bg-[#0b1020]/55 px-4 py-3.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-emerald-300/30 focus:ring-2 focus:ring-emerald-300/10"
                  placeholder="What are you trying to build, improve, or ship?"
                />
              </label>

              <button type="submit" className="aurora-button aurora-button--primary w-full">
                Send message
                <FiSend />
              </button>
            </form>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
