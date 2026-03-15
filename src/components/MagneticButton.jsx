import { useRef } from 'react'

export default function MagneticButton({
  as: Component = 'button',
  className = '',
  children,
  onMouseMove,
  onMouseLeave,
  ...props
}) {
  const ref = useRef(null)

  const handleMouseMove = (event) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      ref.current.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`
    }

    onMouseMove?.(event)
  }

  const handleMouseLeave = (event) => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0, 0)'
    }

    onMouseLeave?.(event)
  }

  return (
    <Component
      ref={ref}
      className={`magnetic-btn ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Component>
  )
}
