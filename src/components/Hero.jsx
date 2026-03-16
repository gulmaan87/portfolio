import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { FiArrowRight, FiDownload } from 'react-icons/fi'
import { SiKubernetes, SiTerraform, SiDocker, SiGithubactions, SiPrometheus } from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import profileImg from '../assets/profile.png'
import './Hero.css'

const metrics = [
  { label: 'Cloud builds', value: '10+' },
  { label: 'Uptime target', value: '99.9%' },
  { label: 'EKS Clusters', value: 'Production' },
  { label: 'GitOps', value: 'ArgoCD' },
]

export default function Hero() {
  const { scrollY } = useScroll()
  
  // Use non-layout transforms for background for maximum performance
  const auroraY = useTransform(scrollY, [0, 900], [0, 40])
  const glowY = useTransform(scrollY, [0, 900], [0, -30])
  
  const onJump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const resumeUrl = '/Gulmaan-CV.pdf'

  // Optimized Parallax Logic
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Lower stiffness/damping for smoother feel on lower end hardware
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  }

  const badgeVariants = {
    animate: (i) => ({
      y: [0, -8, 0],
      transition: { duration: 5, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }
    })
  }

  return (
    <section 
      id="home" 
      className="hero-shell" 
      onMouseMove={handleMouseMove} 
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
      style={{ perspective: '1200px' }}
    >
      <div className="hero-bg" aria-hidden="true">
        <motion.div className="hero-bg__aurora" style={{ y: auroraY, willChange: 'transform' }} />
        <motion.div className="hero-bg__glow" style={{ y: glowY, willChange: 'transform' }} />
        <div className="hero-bg__grain" />
      </div>

      <div className="hero-container">
        <motion.div className="hero-grid" variants={containerVariants} initial="hidden" animate="visible">
          <div className="hero-copy">
            <div className="hero-brand">
              <motion.span variants={itemVariants} className="hero-eyebrow">Cloud & DevOps Engineer</motion.span>
              <motion.div variants={itemVariants} className="hero-name-label"><b>Mohd</b> Gulman Meer</motion.div>
            </div>

            <motion.h1 variants={itemVariants} className="hero-headline">
              Engineering cloud systems that stay calm under production <span>pressure.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="hero-paragraph">
              I design scalable cloud infrastructure, automate CI/CD pipelines, and build observable distributed systems for real-world production workloads.
            </motion.p>

            <motion.div variants={itemVariants} className="hero-btn-group">
              <button onClick={() => onJump('projects')} className="btn-premium-primary">
                View Projects <FiArrowRight className="text-lg" />
              </button>
              <a href={resumeUrl} download className="btn-premium-secondary">
                Download Resume <FiDownload className="text-lg" />
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="hero-metrics">
              {metrics.map((m) => (
                <div key={m.label} className="metric-item">
                  <span className="metric-value">{m.value}</span>
                  <span className="metric-label">{m.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div className="hero-visual-area" style={{ rotateX, rotateY, willChange: 'transform' }}>
            <div className="portrait-container">
              <img src={profileImg} alt="Mohd Gulman Meer" className="portrait-image" loading="eager" />
              
              <motion.div custom={0} variants={badgeVariants} animate="animate" className="floating-badge badge-aws">
                <FaAws className="badge-icon text-[#FF9900]" /> AWS
              </motion.div>
              <motion.div custom={1} variants={badgeVariants} animate="animate" className="floating-badge badge-k8s">
                <SiKubernetes className="badge-icon text-[#326CE5]" /> Kubernetes
              </motion.div>
              <motion.div custom={2} variants={badgeVariants} animate="animate" className="floating-badge badge-docker">
                <SiDocker className="badge-icon text-[#2496ED]" /> Docker
              </motion.div>
              <motion.div custom={3} variants={badgeVariants} animate="animate" className="floating-badge badge-terraform">
                <SiTerraform className="badge-icon text-[#844FBA]" /> Terraform
              </motion.div>
              <motion.div custom={4} variants={badgeVariants} animate="animate" className="floating-badge badge-cicd">
                <SiGithubactions className="badge-icon text-[#22D3EE]" /> CI/CD
              </motion.div>
              <motion.div custom={5} variants={badgeVariants} animate="animate" className="floating-badge badge-monitoring">
                <SiPrometheus className="badge-icon text-[#E6522C]" /> Monitoring
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
