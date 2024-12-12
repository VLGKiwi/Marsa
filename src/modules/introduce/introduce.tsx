'use client'

import { FC, useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './introduce.module.scss';
import { IntroduceProps } from './introduce.types';
import { ButtonBlue, TitleGradient } from '@/ui';
import Image from 'next/image';
import { AnimatedImage } from '@/ui/animatedImage';
import Link from 'next/link';
import { useTranslation } from '@/shared/hooks';
import { useRouter } from 'next/router';


const Introduce: FC<IntroduceProps> = ({ className }) => {
  const [imageSrc, setImageSrc] = useState('/images/introduce.png');
  const rootClassName = classNames(styles.root, className);

  const { locale } = useRouter(); // Получаем текущую локаль из маршрута
  const t = useTranslation(locale as 'en' | 'ru', 'intro') // Используем строго типизированный хук

  useEffect(() => {
    const updateImageSrc = () => {
      if (window.matchMedia('(max-width: 480px)').matches) {
        setImageSrc('/images/introduce-mobile.png'); // Mobile
      } else if (window.matchMedia('(max-width: 1200px)').matches) {
        setImageSrc('/images/introduce.png'); // Tablet
      } else if (window.matchMedia('(min-width: 1440px)').matches) {
        setImageSrc('/images/introduce-large.png'); // Large screen
      } else {
        setImageSrc('/images/introduce-tablet.png'); // Default
      }
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
      <div className={styles.button}><Link href='/vacancy'><ButtonBlue>ВАКАНСИИ</ButtonBlue></Link></div>
      <AnimatedImage className={styles.introducesvg} />
      <TitleGradient className="title__large title__absolute" text={t.title} />
    </div>
  );
};

export default Introduce;
