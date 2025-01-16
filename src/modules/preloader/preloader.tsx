import { FC, useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { gsap } from 'gsap'
import Head from 'next/head'

import styles from './preloader.module.scss'
import { PreloaderProps } from './preloader.types'

const Preloader: FC<PreloaderProps> = ({
  className
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const progressTextRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.to({}, {
      duration: 3.5,
      onUpdate: function () {
        const currentProgress = Math.floor(this.progress() * 100)
        console.log('Текущий прогресс:', currentProgress)

        if (progressRef.current) {
          progressRef.current.style.width = `${currentProgress}%`
        }

        if (progressTextRef.current) {
          progressTextRef.current.textContent = `${currentProgress}%`
        }
      },
      onComplete: () => {
        gsap.to(`.${styles.root}`, {
          opacity: 0,
          duration: 0.5,
          delay: 0.5,
          onComplete: () => {
            setIsVisible(false)
          }
        })
      }
    })

    return () => {
      tl.kill()
    }
  }, [])

  if (!isVisible) return null

  const rootClassName = classNames(styles.root, className)

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
          as="script"
          crossOrigin="anonymous"
        />
      </Head>
      <div className={rootClassName}>
        <div className={styles.spinner}></div>
        <div className={styles.progressText} ref={progressTextRef}>0%</div>
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            ref={progressRef}
          />
        </div>
      </div>
    </>
  )
}

export default Preloader
