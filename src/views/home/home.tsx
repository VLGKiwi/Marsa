'use client'
import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'

import styles from './home.module.scss'
import { HomeProps } from './home.types'
import { Traffic } from '@/modules/traffic'
import { Introduce } from '@/modules/introduce'
import { Faq } from '@/modules/faq'
import { Gumbit } from '@/modules/gumbit'
import { Mission } from '@/modules/mission'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Part } from '@/modules/part'
import { Company } from '@/modules/company'
import { WindowFiller } from '@/modules/windowFiller'
import { Principle } from '@/modules/principle'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const Home: FC<HomeProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)
  const [showIntroduce, setShowIntroduce] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 2) {
        setShowIntroduce(false)
      } else {
        setShowIntroduce(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main className={rootClassName}>
      <WindowFiller />
      {showIntroduce && <Introduce />}
      <div className={styles.imposter}>
        <Company />
        <Traffic />
        <Principle cards={[]} />
        <Mission />
        <Gumbit />
        <Part />
        <Faq />
      </div>
    </main>
  )
}

export default Home
