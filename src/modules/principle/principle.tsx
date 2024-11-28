import { FC } from 'react'
import classNames from 'classnames'

import styles from './principle.module.scss'
import { PrincipleProps } from './principle.types'

const Principle: FC<PrincipleProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <div className={rootClassName}></div>
  )
}

export default Principle
