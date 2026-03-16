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
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div>
          <div className="section-kicker">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-300/80" />
            Resume
          </div>
          <h2 className="section-title max-w-3xl">
            Streamlined resume access and preview.
          </h2>
          <p className="section-copy text-sm md:text-base">
            Quickly download my CV or preview the technical experience directly in-browser.
          </p>
        </div>

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="glass-card depth-card mt-6 overflow-hidden rounded-[2rem] text-zinc-100"
        >
          <div className="flex flex-col gap-3 border-b border-white/10 bg-[#0b1020]/40 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-semibold text-white">Full Experience Preview</div>
            <div className="text-xs text-zinc-500">PDF Document</div>
          </div>

          <div className="grid gap-4 p-4 md:p-5 lg:grid-cols-[1fr_2.2fr]">
            <div className="flex flex-col gap-4">
              <div className="holo-panel rounded-[1.5rem] border-white/10 bg-[#0b1020]/35 p-5">
                <div className="flex items-center gap-3">
                  <span className="holo-panel inline-flex h-11 w-11 items-center justify-center rounded-2xl">
                    <FiFileText className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">Quick actions</div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      Cloud & DevOps Focused CV
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-2.5">
                  <a
                    href={resumeUrl}
                    download
                    className="btn-premium-primary !py-2.5 !px-4 text-sm justify-center"
                  >
                    Download CV
                  </a>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-premium-secondary !py-2.5 !px-4 text-sm justify-center"
                  >
                    Open Full PDF
                  </a>
                </div>
              </div>
              
              <div className="holo-panel hidden lg:block rounded-[1.5rem] border-white/10 bg-[#0b1020]/20 p-5 flex-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-4">Core Competencies</div>
                <ul className="text-xs text-zinc-400 space-y-3">
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.6)]" /> 
                    <div>
                      <span className="text-zinc-200 font-semibold block">Kubernetes Orchestration</span>
                      Managed EKS clusters with high availability and node scaling.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1 shadow-[0_0_8px_rgba(59,130,246,0.6)]" /> 
                    <div>
                      <span className="text-zinc-200 font-semibold block">Infrastructure as Code</span>
                      Modular Terraform for repeatable, multi-environment deployments.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1 shadow-[0_0_8px_rgba(16,185,129,0.6)]" /> 
                    <div>
                      <span className="text-zinc-200 font-semibold block">GitOps & CI/CD</span>
                      ArgoCD for automated sync and GitHub Actions for pipelines.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1 shadow-[0_0_8px_rgba(244,63,94,0.6)]" /> 
                    <div>
                      <span className="text-zinc-200 font-semibold block">Observability Stack</span>
                      Full-stack monitoring with Prometheus, Grafana, and ELK.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1 shadow-[0_0_8px_rgba(251,191,36,0.6)]" /> 
                    <div>
                      <span className="text-zinc-200 font-semibold block">Security & Compliance</span>
                      IAM role least-privilege, ECR scanning, and VPC isolation.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 mt-1 shadow-[0_0_8px_rgba(192,38,211,0.6)]" /> 
                    <div>
                      <span className="text-zinc-200 font-semibold block">Messaging Systems</span>
                      Distributed event flows using RabbitMQ and Redis.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="aspect-[8.5/11] min-h-[30rem] lg:min-h-[45rem] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1020]/50 shadow-2xl">
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
