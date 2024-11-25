import { FC } from 'react'
import classNames from 'classnames'

import Astronaut from '@public/images/astrounaut__vacancy.png'
import styles from './friend.module.scss'
import { FriendProps } from './friend.types'
import { Button, TitleGradient } from '@/ui'
import Image from 'next/image'

const Friend: FC<FriendProps> = ({
  className,
  title,
  textBonus,
  textButton
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <section className={rootClassName}>
      <div className={styles.section}>
        <h2 className={styles.title}>
          <TitleGradient
            text={` ${title} `}
          />
        </h2>
        <p className={styles.text}>{textBonus}</p>
      </div>
      <Button className={styles.button}>{textButton}</Button>
      <Image
        src={Astronaut}
        alt='astronaut'
        className={styles.image}
      />
    </section>
  )
}

export default Friend
