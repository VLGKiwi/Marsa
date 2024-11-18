import { FC } from 'react'
import classNames from 'classnames'

import styles from './traffic.module.scss'
import { TrafficProps } from './traffic.types'
import { TrafficText, TrafficTitle } from '@/components'

const Traffic: FC<TrafficProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <TrafficTitle />
      <TrafficText />
    </div>
  )
}

export default Traffic
