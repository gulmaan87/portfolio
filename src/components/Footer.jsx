import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const LINKS = [
  { label: 'Email', href: 'mailto:mohdgulmanmeer@example.com', icon: FiMail },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/', icon: FiLinkedin },
  { label: 'GitHub', href: 'https://github.com/', icon: FiGithub },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-28 md:pb-10">
        <div className="glass-card depth-card rounded-[2rem] px-6 py-6 md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-lg font-semibold text-white">Mohd Gulman Meer</div>
              <div className="mt-2 max-w-xl text-sm text-zinc-400">
                Cloud and DevOps engineer focused on dependable platform delivery and distributed
                system design.
              </div>
            </div>

            <div className="flex items-center gap-3">
              {LINKS.map((link) => {
                const Icon = link.icon

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-200 transition hover:bg-white/10"
                    aria-label={link.label}
                    title={link.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Mohd Gulman Meer. All rights reserved.</div>
            <div>Built with React, Tailwind CSS, and Framer Motion.</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
