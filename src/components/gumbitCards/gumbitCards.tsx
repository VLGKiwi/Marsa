'use client';

import { FC, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import styles from './gumbitCards.module.scss';
import { GumbitCardsProps } from './gumbitCards.types';
import { GumbitCard } from '@/ui';
import { useGSAP } from '@gsap/react';

const GumbitCards: FC<GumbitCardsProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[][]>([]);
  const hasAnimatedRef = useRef(false); // Флаг, чтобы анимация выполнялась только один раз

  // Три массива с текстами
  const rows = [
    ['Фарм отдел', 'Production', 'HR-отдел', 'Финансовый отдел', 'Креативный отдел'],
    ['SEO отдел', 'Отдел мобильной разработки', 'IT-отдел', 'Отдел Media buying FB'],
    ['Отдел Media buying Google', 'АSO отдел'],
  ];

  // Используем кастомный хук useGSAP
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Устанавливаем начальное положение карточек до триггера анимации
    if (containerRef.current) {
      cardRefs.current.forEach((row) => {
        row.forEach((card) => {
          if (card) {
            const parentBounds = containerRef.current!.getBoundingClientRect();
            const cardBounds = card.getBoundingClientRect();

            // Вычисляем расстояние от верхнего левого угла родителя
            const offsetX = cardBounds.left - parentBounds.left;
            const offsetY = cardBounds.top - parentBounds.top;

            // Устанавливаем карточки в начальное положение
            gsap.set(card, {
              x: -offsetX,
              y: -offsetY,
              opacity: 0,
            });
          }
        });
      });
    }

    if (containerRef.current && !hasAnimatedRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top center',
        onEnter: () => {
          if (hasAnimatedRef.current) return;
          hasAnimatedRef.current = true; // Устанавливаем флаг, чтобы анимация запускалась один раз

          cardRefs.current.forEach((row, rowIndex) => {
            row.forEach((card, cardIndex) => {
              if (card) {
                // Анимация перемещения карточек на их место
                gsap.to(card, {
                  x: 0,
                  y: 0,
                  opacity: 1,
                  duration: 2,
                  ease: 'power3.out',
                  delay: rowIndex * 0.5 + cardIndex * 0.2, // Ряд + карточка для последовательности
                });
              }
            });
          });
        },
      });
    }
  });

  return (
    <div ref={containerRef} className={rootClassName}>
      {rows.map((texts, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {texts.map((text, index) => (
            <div
              key={index}
              ref={(el) => {
                if (!cardRefs.current[rowIndex]) cardRefs.current[rowIndex] = [];
                if (el) cardRefs.current[rowIndex][index] = el;
              }}
            >
              <GumbitCard text={text} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GumbitCards;
