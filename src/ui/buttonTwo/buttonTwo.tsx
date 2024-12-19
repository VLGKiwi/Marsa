'use client'

import { FC, useRef } from 'react'
import classNames from 'classnames'

import styles from './buttonTwo.module.scss'
import { ButtonTwoProps } from './buttonTwo.types'
import Image from 'next/image'
import LeftAngle from '@public/images/button_left_angle.png'
import RightAngle from '@public/images/button_right_angle.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Button: FC<ButtonTwoProps> = ({
  className,
  text,
  big,
  modal
}) => {
  const rootClassName = classNames(styles.root, className)
  const btnRef = useRef(null)
  const textRef = useRef(null)

  useGSAP(() => {
    if (modal) {
      const tl = gsap.timeline({
        scrollTrigger: ({
          trigger: btnRef.current,
        })
      })
      tl.fromTo(btnRef.current, {
        width: 49,
        height: 48
      }, {
        width: '100%',
        height: '100%',
        duration: 2,
      }).to(textRef.current, {
        opacity: 1,
        duration: 1
      })
    } else {
      const tl = gsap.timeline({
        scrollTrigger: ({
          trigger: btnRef.current,
          start: 'bottom bottom'
        })
      })
      tl.fromTo(btnRef.current, {
        width: 49,
        height: 48
      }, {
        width: '100%',
        height: '100%',
        duration: 2,
      }).to(textRef.current, {
        opacity: 1,
        duration: 1
      })
    }
  })

  if (big) {
    return (
      <div className={styles.bigCont}>
        <div className={styles.big} ref={btnRef}>
          <Image
            src={LeftAngle}
            alt={'angle'}
            className={styles.left}
          />
          <Image
            src={RightAngle}
            alt={'angle'}
            className={styles.right}
          />
          <a className={styles.text} ref={textRef}>
            {text}
          </a>
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.smallCont}>
        <div className={rootClassName} ref={btnRef}>
          <Image
            src={LeftAngle}
            alt={'angle'}
            className={styles.left}
          />
          <Image
            src={RightAngle}
            alt={'angle'}
            className={styles.right}
          />
          <a className={styles.text} ref={textRef}>
            {text}
          </a>
        </div>
      </div>
    )
  }
}

export default Button
