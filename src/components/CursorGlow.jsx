import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export default function CursorGlow() {
  const x = useMotionValue(-300)
  const y = useMotionValue(-300)
  const springX = useSpring(x, { stiffness: 80, damping: 24 })
  const springY = useSpring(y, { stiffness: 80, damping: 24 })

  useEffect(() => {
    const handleMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }

    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [x, y])

  return <motion.div className="cursor-aura hidden lg:block" style={{ left: springX, top: springY }} />
}
