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
      whileHover={reduce ? undefined : { scale: 1.015 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 480, damping: 26 }}
    >
      <Link
        className={`rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 ${className}`.trim()}
        {...linkProps}
      >
        {children}
      </Link>
    </motion.span>
  )
}

export default MotionLink
