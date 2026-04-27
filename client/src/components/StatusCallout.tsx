import type { ReactNode } from 'react'

type StatusCalloutProps = {
  tone?: 'info' | 'success' | 'error'
  children: ReactNode
  className?: string
}

function StatusCallout({ tone = 'info', children, className = '' }: StatusCalloutProps) {
  const toneClass = {
    info: 'status-callout-info',
    success: 'status-callout-success',
    error: 'status-callout-error',
  }[tone]

  return <div className={`status-callout ${toneClass} ${className}`.trim()}>{children}</div>
}

export default StatusCallout
