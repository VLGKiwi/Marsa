import { FC } from 'react'
import classNames from 'classnames'

import styles from './trafficTv.module.scss'
import { TrafficTvProps } from './trafficTv.types'

const TrafficTv: FC<TrafficTvProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <div className={rootClassName}></div>
  )
}

export default TrafficTv
