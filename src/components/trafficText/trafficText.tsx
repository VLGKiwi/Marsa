import { FC } from 'react'
import classNames from 'classnames'

import styles from './trafficText.module.scss'
import { TrafficTextProps } from './trafficText.types'

const TrafficText: FC<TrafficTextProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>Используем расчеты ROI, прогноз показателей и полную экономику заливов, чтобы&nbsp;сосредоточиться на действиях, которые принесут максимальный результат.</div>
  )
}

export default TrafficText
