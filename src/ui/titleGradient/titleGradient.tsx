'use client'

import { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';

import styles from './titleGradient.module.scss';
import { TitleGradientProps } from './titleGradient.types';

const TitleGradient: FC<TitleGradientProps> = ({
  className,
  text,
  children
}) => {
  const rootClassName = classNames(
    styles.root, // Основной класс из CSS-модуля
    className?.split(' ').map((cls) => styles[cls]) // Преобразование переданных классов в модульные
  );
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        backgroundPosition: '200% 0',
        duration: 4,
        repeat: -1,
        ease: 'linear',
      });
    }
  }, []);

  return (
    <span className={rootClassName} ref={textRef}>
      {text}
      {children}
    </span>
  );
};

export default TitleGradient;
