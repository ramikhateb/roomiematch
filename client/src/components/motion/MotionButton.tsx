import { forwardRef } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

type MotionButtonProps = HTMLMotionProps<'button'> & {
  variant?: 'primary' | 'ghost' | 'outline' | 'soft'
}

const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  function MotionButton({ variant = 'primary', className = '', ...props }, ref) {
    const reduce = useReducedMotion()

    const base =
      'inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 disabled:pointer-events-none disabled:opacity-50'

    const variants = {
      primary: 'bg-linear-to-r from-cyan-500 to-violet-500 text-white shadow-[0_10px_24px_-10px_rgba(8,145,178,0.45)]',
      ghost: 'border border-transparent bg-transparent text-slate-700 hover:bg-slate-100',
      outline: 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50',
      soft: 'border border-cyan-200/60 bg-cyan-50 text-cyan-900 hover:border-cyan-300 hover:bg-cyan-100/75',
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
