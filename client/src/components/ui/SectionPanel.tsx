import type { ReactNode } from 'react'

type SectionPanelProps = {
  title: string
  subtitle?: string
  badge?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}

function SectionPanel({
  title,
  subtitle,
  badge,
  children,
  className = '',
  bodyClassName = '',
}: SectionPanelProps) {
  return (
    <section
      className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3.5 sm:px-5">
        <div className="min-w-0">
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p> : null}
        </div>
        {badge ? <div className="shrink-0">{badge}</div> : null}
      </div>
      <div className={bodyClassName}>{children}</div>
    </section>
  )
}

export default SectionPanel
