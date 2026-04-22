import { Link, type LinkProps } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

type MotionLinkProps = LinkProps & {
  className?: string
}

function MotionLink({ className = '', children, ...linkProps }: MotionLinkProps) {
  const reduce = useReducedMotion()

  return (
    <motion.span
      className="inline-flex max-w-full"
      whileHover={reduce ? undefined : { scale: 1.02 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 480, damping: 26 }}
    >
      <Link className={className} {...linkProps}>
        {children}
      </Link>
    </motion.span>
  )
}

export default MotionLink
