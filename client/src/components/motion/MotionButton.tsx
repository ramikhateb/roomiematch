import { forwardRef } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

type MotionButtonProps = HTMLMotionProps<'button'> & {
  variant?: 'primary' | 'ghost' | 'outline'
}

const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  function MotionButton({ variant = 'primary', className = '', ...props }, ref) {
    const reduce = useReducedMotion()

    const base =
      'inline-flex items-center justify-center rounded-xl font-semibold outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 disabled:pointer-events-none disabled:opacity-50'

    const variants = {
      primary: 'bg-linear-to-r from-cyan-500 to-violet-500 text-white shadow-[0_10px_24px_-10px_rgba(8,145,178,0.45)]',
      ghost: 'border border-transparent bg-transparent text-slate-800',
      outline: 'border border-slate-300 bg-white text-slate-800',
    }[variant]

    return (
      <motion.button
        ref={ref}
        className={`${base} ${variants} ${className}`.trim()}
        whileHover={
          reduce
            ? undefined
            : {
                scale: 1.02,
                ...(variant === 'primary' ? { filter: 'brightness(1.06)' } : {}),
              }
        }
        whileTap={reduce ? undefined : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 480, damping: 26 }}
        {...props}
      />
    )
  }
)

export default MotionButton
