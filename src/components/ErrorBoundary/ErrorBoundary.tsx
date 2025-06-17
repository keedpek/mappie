import React from 'react'

import { navigateToMain } from '@/utils/navigate'

import style from './ErrorBoundary.module.css'

interface ErrorBoundaryProps {
  children: React.ReactNode
  message?: string
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Ошибка: ', error, 'Информация: ', errorInfo)
  }

  handleReload = () => {
    this.setState({ hasError: false })
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className={style.container}>
          <h2>{this.props.message || 'Что-то пошло не так('}</h2>
          <div className={style.btnContainer}>
            <button
              className={`${style.btn} ${style.toMain}`}
              onClick={navigateToMain}
            >
              Вернуться на главную
            </button>
            <button
              className={`${style.btn} ${style.reload}`}
              onClick={this.handleReload}
            >
              Перезагрузить
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
