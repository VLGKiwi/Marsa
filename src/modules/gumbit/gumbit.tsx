import { FC } from 'react'
import classNames from 'classnames'

import styles from './gumbit.module.scss'
import { GumbitProps } from './gumbit.types'

const Gumbit: FC<GumbitProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <div className={rootClassName}></div>
  )
}

export default Gumbit
