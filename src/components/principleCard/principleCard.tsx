import { FC } from 'react'
import classNames from 'classnames'

import styles from './principleCard.module.scss'
import { PrincipleCardProps } from './principleCard.types'

const PrincipleCard: FC<PrincipleCardProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}></div>
  )
}

export default PrincipleCard
