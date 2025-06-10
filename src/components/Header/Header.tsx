import { FC } from 'react'
import svg from '@/assets/react.svg'

const Header: FC = () => {
  function foo(asdfasdf: number, eqweroit: string) {
    let a: string = ''
    a = asdfasdf + eqweroit
    return a
  }
  foo(1, 'a')
  return (
    <div>
      <img src={svg} />
    </div>
  )
}

export default Header
