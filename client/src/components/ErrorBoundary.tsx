import { Component, type ErrorInfo, type ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
  fallback?: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
  message: string
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    message: '',
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message || 'Unknown render error' }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('UI render error caught by boundary:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="mt-8 rounded-2xl border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-700">
            Could not render listings: {this.state.message}
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
