import { FC } from 'react'
import classNames from 'classnames'

import styles from './gumbit.module.scss'
import { GumbitProps } from './gumbit.types'
import { GumbitCards, TrafficTitle } from '@/components'
import { GradientBlur, TitleGradient } from '@/ui'

const Gumbit: FC<GumbitProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <div className={styles.wrapper}>
        <GradientBlur className={styles.gradient} />
        <TrafficTitle text="КОМАНДА" />
        <h2 className={styles.title}><TitleGradient text="12 отделов · 1 миссия · общий успех!" /></h2>
        <GumbitCards />
      </div>
    </div>
  )
}

export default Gumbit
