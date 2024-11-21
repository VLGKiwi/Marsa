'use client'

import { FC, useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './introduce.module.scss';
import { IntroduceProps } from './introduce.types';
import { TitleGradient } from '@/ui'
import Image from 'next/image';

const Introduce: FC<IntroduceProps> = ({ className }) => {
  const [imageSrc, setImageSrc] = useState('/images/introduce.png');
  const rootClassName = classNames(styles.root, className);

  useEffect(() => {
    const updateImageSrc = () => {
      setImageSrc(
        window.matchMedia('(min-width: 1440px)').matches
          ? '/images/introduce-large.png'
          : '/images/introduce.png'
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
      <TitleGradient className="title__large title__absolute" text="MARSA TEAM" />
    </div>
  );
};

export default Introduce;
