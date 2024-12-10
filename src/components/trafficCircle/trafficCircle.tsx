import { FC } from 'react'
import classNames from 'classnames'

import styles from './trafficCircle.module.scss'
import { TrafficCircleProps } from './trafficCircle.types'


import SvgCircle from '@icons/circle.svg';

const TrafficCircle: FC<TrafficCircleProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <SvgCircle className={styles.image} alt="Circle" width={'100%'} height={'auto'} />
      <p className={styles.text}><span className={styles.textwhite}>Анализируем эффективность</span><br></br> и меняем направление, если видим отклонения от заданного курса</p>
    </div>
  )
}

export default TrafficCircle
