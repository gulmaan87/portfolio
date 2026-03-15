import { motion, useReducedMotion } from 'framer-motion'
import { FiFileText } from 'react-icons/fi'

export default function Resume() {
  const reduceMotion = useReducedMotion()
  const resumeUrl = '/Gulmaan-CV.pdf'

  const fade = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="resume" className="section-frame scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div>
          <div className="section-kicker">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-300/80" />
            Resume
          </div>
          <h2 className="section-title max-w-3xl">
            Resume viewing that behaves better on smaller screens.
          </h2>
          <p className="section-copy text-sm md:text-base">
            The preview is kept for desktop and tablet, while the controls remain clear and usable
            on mobile.
          </p>
        </div>

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="glass-card depth-card mt-8 overflow-hidden rounded-[2rem] text-zinc-100"
        >
          <div className="flex flex-col gap-3 border-b border-white/10 bg-[#0b1020]/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-semibold text-white">Resume Preview</div>
            <div className="text-xs text-zinc-500">PDF preview</div>
          </div>

          <div className="grid gap-4 p-4 md:p-6 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="holo-panel rounded-[1.5rem] border-white/10 bg-[#0b1020]/35 p-5">
              <div className="flex items-center gap-3">
                <span className="holo-panel inline-flex h-11 w-11 items-center justify-center rounded-2xl">
                  <FiFileText className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">Quick actions</div>
                  <div className="text-sm text-zinc-500">
                    Best experience on desktop, still usable on mobile.
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <a
                  href={resumeUrl}
                  download
                  className="holo-panel rounded-[1.2rem] border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-zinc-100 transition hover:bg-white/10"
                >
                  Download latest resume
                </a>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="holo-panel rounded-[1.2rem] border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-zinc-100 transition hover:bg-white/10"
                >
                  Open PDF in new tab
                </a>
              </div>
            </div>

            <div className="aspect-[8.5/11] min-h-[24rem] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1020]/50">
              <iframe
                title="Resume PDF"
                src={`${resumeUrl}#toolbar=0&navpanes=0&view=FitH`}
                className="h-full w-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
