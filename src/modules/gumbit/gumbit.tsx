import { FC } from 'react'
import classNames from 'classnames'

import styles from './gumbit.module.scss'
import { GumbitProps } from './gumbit.types'
import { GumbitCards, TrafficTitle } from '@/components'
import { TitleGradient } from '@/ui'

const Gumbit: FC<GumbitProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      <TrafficTitle text="КОМАНДА" />
      <TitleGradient text="12 отделов · 1 миссия · общий успех!" />
      <GumbitCards />
    </div>
  )
}

export default Gumbit
