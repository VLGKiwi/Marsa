'use client'

import { FC, useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';

import styles from './principleCards.module.scss';
import { PrincipleCardsProps } from './principleCards.types';
import PrincipleCard from '../principleCard/principleCard';

const AUTO_SLIDE_INTERVAL = 3000; // Интервал автоматической смены слайдов (мс)

const PrincipleCards: FC<PrincipleCardsProps> = ({ className, cards }) => {
  const rootClassName = classNames(styles.root, className);

  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    const currentSlide = slidesRef.current[currentIndex];
    const nextSlide = slidesRef.current[index];

    if (currentSlide && nextSlide) {
      // Анимация ухода текущего слайда
      gsap.to(currentSlide, {
        scale: 0,
        xPercent: 100,
        yPercent: 100,
        duration: 0.5,
        ease: 'power2.out',
      });

      // Анимация появления следующего слайда
      gsap.fromTo(
        nextSlide,
        { scale: 0, xPercent: 100, yPercent: 100 },
        { scale: 1, xPercent: 0, yPercent: 0, duration: 0.5, ease: 'power2.out' }
      );
    }

    setCurrentIndex(index);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % cards.length;
    goToSlide(newIndex);
  };

  useEffect(() => {
    // Автоматическое переключение слайдов
    const interval = setInterval(handleNext, AUTO_SLIDE_INTERVAL);

    // Очистка интервала при размонтировании
    return () => clearInterval(interval);
  }, [currentIndex, cards.length]);

  return (
    <div className={styles.root} ref={containerRef}>
      {cards.map((card, index) => (
        <div
          key={index}
          ref={(el) => (slidesRef.current[index] = el!)}
          className={classNames(styles.slide, { [styles.active]: index === currentIndex })}
        >
          <PrincipleCard
            number={card.number}
            title={card.title}
            description={card.description}
            className={styles.card}
          />
        </div>
      ))}
    </div>
  );
};

export default PrincipleCards;
