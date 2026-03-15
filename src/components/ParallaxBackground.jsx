import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxBackground() {
  const { scrollY } = useScroll()
  const ySlow = useTransform(scrollY, [0, 1400], [0, 120])
  const yFast = useTransform(scrollY, [0, 1400], [0, -120])

  return (
    <>
      <motion.div className="parallax-layer parallax-layer--one" style={{ y: ySlow }} />
      <motion.div className="parallax-layer parallax-layer--two" style={{ y: yFast }} />
    </>
  )
}
