import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Education from '../components/Education.jsx'
import Skills from '../components/Skills.jsx'
import Achievements from '../components/Achievements.jsx'
import Certifications from '../components/Certifications.jsx'
import Resume from '../components/Resume.jsx'
import Projects from '../components/Projects.jsx'
import Architecture from '../components/Architecture.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'
import FloatingDock from '../components/FloatingDock.jsx'
import ParallaxBackground from '../components/ParallaxBackground.jsx'

const GlobalNetworkBackground = lazy(() => import('../components/GlobalNetworkBackground.jsx'))

export default function Home() {
  return (
    <div className="site-background min-h-screen text-zinc-100">
      <Suspense fallback={<div className="global-network-bg" aria-hidden="true" />}>
        <GlobalNetworkBackground />
      </Suspense>
      <ParallaxBackground />
      <div className="ambient-light" aria-hidden="true" />

      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Achievements />
        <Certifications />
        <Resume />
        <Projects />
        <Architecture />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
