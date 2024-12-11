/* eslint-disable no-irregular-whitespace */
import { FC } from 'react'
import classNames from 'classnames'

import Astronaut from '@public/images/astrounaut__vacancy.png'
import styles from './friend.module.scss'
import { FriendProps } from './friend.types'
import { ButtonTwo, TitleGradient } from '@/ui'
import Image from 'next/image'

const Friend: FC<FriendProps> = ({
  className,
  textBonus,
  textButton
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <section className={rootClassName}>
      <div className={styles.section}>
        <h2 className={styles.title}>
          <TitleGradient>
            Отправь продуктивного друга к нам на&nbsp;MARS
          </TitleGradient>
        </h2>
        <p className={styles.text}>{textBonus}</p>
      </div>
      <ButtonTwo text={'Узнать подробности у HR'} big={true} />
      <Image
        src={Astronaut}
        alt='astronaut'
        className={styles.image}
        quality={100}
      />
    </section>
  )
}

export default Friend
