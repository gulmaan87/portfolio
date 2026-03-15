import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowRight, FiDownload, FiMail, FiPlayCircle } from 'react-icons/fi'
import MagneticButton from './MagneticButton.jsx'
import profileImg from '../assets/profile.png'
import './Hero.css'

const signalStats = [
  { label: 'Primary lane', value: 'Cloud platforms' },
  { label: 'Delivery model', value: 'GitOps + progressive rollout' },
  { label: 'Systems bias', value: 'Reliable distributed flows' },
]

const proofPoints = [
  'AWS and Kubernetes focused delivery',
  'Observability-aware deployment thinking',
  'Backend to platform ownership mindset',
]

export default function Hero() {
  const { scrollY } = useScroll()
  const auroraY = useTransform(scrollY, [0, 900], [0, 90])
  const glowY = useTransform(scrollY, [0, 900], [0, -70])
  const onJump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const resumeUrl = '/Gulmaan-CV.pdf'

  return (
    <section id="home" className="hero-shell scroll-mt-28">
      <div className="hero-bg" aria-hidden="true">
        <motion.div className="hero-bg__aurora" style={{ y: auroraY }} />
        <motion.div className="hero-bg__glow" style={{ y: glowY }} />
        <div className="hero-bg__grain" />
      </div>

      <div className="hero-container">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="hero-kicker__dot" />
              Open to cloud, DevOps, and platform engineering roles
            </div>

            <div className="hero-intro">Cloud Engineer Portfolio</div>
            <h1 className="hero-title">Building platform systems that look calm under production pressure.</h1>

            <p className="hero-description">
              Mohd Gulman Meer. I design cloud infrastructure, delivery pipelines, and
              distributed-system workflows with an emphasis on clarity, resilience, and operational
              confidence.
            </p>

            <div className="hero-actions">
              <MagneticButton
                type="button"
                onClick={() => onJump('projects')}
                className="hero-button hero-button--primary"
              >
                Explore case studies
                <FiArrowRight />
              </MagneticButton>

              <MagneticButton
                as="a"
                href={resumeUrl}
                download
                className="hero-button hero-button--ghost"
              >
                Download resume
                <FiDownload />
              </MagneticButton>

              <MagneticButton
                type="button"
                onClick={() => onJump('contact')}
                className="hero-button hero-button--accent"
              >
                Contact
                <FiMail />
              </MagneticButton>
            </div>

            <div className="hero-stats">
              {signalStats.map((item) => (
                <div key={item.label} className="hero-stat-card">
                  <div className="hero-stat-card__label">{item.label}</div>
                  <div className="hero-stat-card__value">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-panel-wrap">
            <div className="hero-panel-glow hero-panel-glow--left" />
            <div className="hero-panel-glow hero-panel-glow--right" />

            <div className="hero-panel">
              <div className="hero-panel__header">
                <div>
                  <div className="hero-panel__eyebrow">Signal board</div>
                  <div className="hero-panel__title">Platform operator view</div>
                </div>
                <button
                  type="button"
                  onClick={() => onJump('architecture')}
                  className="hero-panel__link"
                >
                  Architecture
                  <FiPlayCircle />
                </button>
              </div>

              <div className="hero-panel__content">
                <div className="hero-profile">
                  <div className="hero-profile__visual">
                    <div className="hero-profile__halo" />
                    <img src={profileImg} alt="Mohd Gulman Meer" className="hero-profile__image" loading="lazy" />
                  </div>

                  <div className="hero-profile__meta">
                    <div className="hero-profile__label">Operator</div>
                    <div className="hero-profile__name">Mohd Gulman Meer</div>
                    <div className="hero-profile__text">
                      Cloud and DevOps engineer with distributed-systems bias
                    </div>
                  </div>
                </div>

                <div className="hero-proof-list">
                  {proofPoints.map((point, index) => (
                    <div key={point} className="hero-proof-card">
                      <div className="hero-proof-card__index">0{index + 1}</div>
                      <div className="hero-proof-card__text">{point}</div>
                    </div>
                  ))}

                  <div className="hero-focus-grid">
                    <div className="hero-focus-card hero-focus-card--cyan">
                      <div className="hero-focus-card__label">Focus now</div>
                      <div className="hero-focus-card__value">Cloud-native infrastructure delivery</div>
                    </div>
                    <div className="hero-focus-card hero-focus-card--blue">
                      <div className="hero-focus-card__label">Outcome bias</div>
                      <div className="hero-focus-card__value">Safer rollout paths and clearer operations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
