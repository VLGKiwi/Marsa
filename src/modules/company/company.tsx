'use client'

import { FC, useRef } from 'react'
import classNames from 'classnames'

import styles from './company.module.scss'
import { CompanyProps } from './company.types'
import { Disclose } from '@/ui'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Company: FC<CompanyProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  const container = useRef(null)

  useGSAP(() => {
    const cont = container.current

    gsap.fromTo(cont, {
      width: 43,
      height: 46
    }, {
      width: '100%',
      height: '100%',
      duration: 2,
      scrollTrigger: {
        trigger: cont,
        start: 'top center',
      }
    })
  })

  return (
    <div className={styles.company}>
      <div className={rootClassName}>
        <div className={styles.container__title} ref={container}>
          <Disclose />
          <div className={styles.title}>
            <h2>Управляем сложными процессами медиабаинга с помощью прогнозирования, анализа и оптимизации кампаний</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Company
