import { FC } from 'react'
import style from './Loader.module.css'

interface LoaderProps {
  size?: 's' | 'm' | 'l'
  color?: 'white' | 'purple'
}

const Loader: FC<LoaderProps> = ({ size = 's', color = 'purple' }) => {
  return (
    <div className={`${style.loader} ${style[size]} ${style[color]}`}></div>
  )
}

export default Loader
