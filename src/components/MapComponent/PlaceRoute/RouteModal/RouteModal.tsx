import { FC } from 'react'
import { createPortal } from 'react-dom'

import { convertTimeFromSeconds } from '@/utils/convertTimeFromSeconds'

import style from './RouteModal.module.css'

interface RouteModalProps {
  distance: number
  duration: number
  onClose: () => void
}

const RouteModal: FC<RouteModalProps> = ({ distance, duration, onClose }) => {
  return createPortal(
    <div className={style.modalContainer}>
      <button onClick={onClose} className={style.closeBtn}>
        x
      </button>
      <div className={style.infoContainer}>
        <h2>{`${(distance / 1000).toFixed(2)} км`}</h2>
        <p>дистанция</p>
      </div>
      <div className={style.infoContainer}>
        <h2>{convertTimeFromSeconds(duration)}</h2>
        <p>примерное время</p>
      </div>
    </div>,
    document.body
  )
}

export default RouteModal
