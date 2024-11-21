'use client'

import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'

import styles from './faq.module.scss'
import { FaqProps } from './faq.types'
import { TitleGradient } from '@/ui'
import Image from 'next/image'

const Faq: FC<FaqProps> = ({
  className
}) => {
  const [imageSrc, setImageSrc] = useState('/images/introduce.png');
  const rootClassName = classNames(styles.root, className);

  useEffect(() => {
    const updateImageSrc = () => {
      setImageSrc(
        window.matchMedia('(min-width: 1440px)').matches
          ? '/images/spaceship.png'
          : '/images/spaceship.png'
      );
    };

    updateImageSrc(); // Set initial image
    window.addEventListener('resize', updateImageSrc);
    return () => window.removeEventListener('resize', updateImageSrc);
  }, []);

  return (
    <div className={rootClassName}>
      <Image
        src={imageSrc}
        width={1920}
        height={1080}
        alt="Фон"
        quality={100}
        className={styles.image}
      />
      <TitleGradient className="title__large title__absolute" text="FAQ" />
    </div>
  )
}

export default Faq
