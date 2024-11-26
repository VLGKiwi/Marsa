/* eslint-disable no-irregular-whitespace */
'use client'

import { FC, useRef } from 'react'
import classNames from 'classnames'

import styles from './mission.module.scss'
import { MissionProps } from './mission.types'
import { TitleGradient } from '@/ui'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Mission: FC<MissionProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  const text = useRef(null)
  const container__text = useRef(null)

  useGSAP(() => {
    const container = container__text.current
    const tx = text.current

    gsap.fromTo(tx, {
      y: 400
    }, {
      y: 0,
      duration: 3,
      scrollTrigger: {
        trigger: container,
        start: 'top 40%',
      }
    })
  })

  return (
    <div className={rootClassName}>
      <h2 className={styles.title}>
        <TitleGradient
          text={'миссия'}
        />
      </h2>
      <div className={styles.container} ref={container__text}>
        <div className={styles.container__wrapper}>
          <p className={styles.wrapper__text} ref={text}>
            <span>
              Наша миссия — быть командой номер 1 в медиабаинге в вертикали iGaming. Мы добиваемся этого, создавая исключительные условия для роста и развития сильных профессионалов, которые ценят ответственность за результат.
            </span>
            <span>
              Мы вознаграждаем тех, кто вносит реальный вклад, и обеспечиваем нашим партнерам и рекламодателям максимальный профит благодаря качеству нашей работы.
            </span>
            <span>
              Если ты стремишься к космическим высотам и готов быть лучшим — тебе с нами по пути.
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Mission
