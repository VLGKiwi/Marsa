/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { FC, useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';

import styles from './principleCards.module.scss';
import { PrincipleCardsProps } from './principleCards.types';
import PrincipleCard from '../principleCard/principleCard';

const AUTO_SLIDE_INTERVAL = 10000; // Интервал автоматической смены слайдов (мс)

const PrincipleCards: FC<PrincipleCardsProps> = ({ className, cards }) => {
  const rootClassName = classNames(styles.root, className);

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    const container = containerRef.current;
    if (container) {
      const cardWidth = container.offsetWidth;
      gsap.to(container, { x: -index * cardWidth, duration: 0.5, ease: 'power2.out' });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % cards.length;
    goToSlide(newIndex);
  };

  useEffect(() => {
    // Автоматическое переключение слайдов
    const interval = setInterval(handleNext, AUTO_SLIDE_INTERVAL);

    // Сброс интервала при размонтировании компонента
    return () => clearInterval(interval);
  }, [currentIndex, cards.length]);

  useEffect(() => {
    // Учет изменения размеров экрана
    const handleResize = () => goToSlide(currentIndex);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  return (
    <div className={styles.root}>
      <div className={styles.sliderWrapper} ref={containerRef}>
        {cards.map((card, index) => (
          <div className={styles.slide} key={index}>
            <PrincipleCard
              number={card.number}
              title={card.title}
              description={card.description}
              className={styles.card}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrincipleCards;
