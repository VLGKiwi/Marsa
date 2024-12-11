'use client';

import { FC, useEffect, useState, useRef } from 'react';
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
  const hasAnimatedRef = useRef(false);

  const [rows, setRows] = useState([
    ['Фарм отдел', 'Production', 'HR-отдел', 'Финансовый отдел', 'Креативный отдел'],
    ['SEO отдел', 'Отдел мобильной разработки', 'IT-отдел', 'Отдел Media buying FB'],
    ['Отдел Media buying Google', 'АSO отдел'],
  ]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setRows([
          ['Фарм отдел', 'HR-отдел'],
          ['IT-отдел', 'SEO отдел'],
          ['Фарм отдел', 'HR-отдел'],
          ['IT-отдел', 'SEO отдел'],
          ['Фарм отдел', 'HR-отдел'],
          ['IT-отдел', 'SEO отдел'],
          ['Фарм отдел', 'HR-отдел'],
          ['IT-отдел', 'SEO отдел'],
        ]);
      } else if (width < 1200) {
        setRows([
          ['Фарм отдел', 'Production', 'HR-отдел'],
          ['SEO отдел', 'IT-отдел', 'Пустышка'],
          ['Фарм отдел', 'Production', 'HR-отдел'],
          ['SEO отдел', 'IT-отдел', 'Пустышка'],
        ]);
      } else {
        setRows([
          ['Фарм отдел', 'Production', 'HR-отдел', 'Финансовый отдел', 'Креативный отдел'],
          ['SEO отдел', 'Отдел мобильной разработки', 'IT-отдел', 'Отдел Media buying FB'],
          ['Отдел Media buying Google', 'АSO отдел'],
        ]);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current) {
      cardRefs.current.forEach((row) => {
        row.forEach((card) => {
          if (card) {
            gsap.set(card, {
              x: 0,
              y: 100,
              opacity: 0,
            });
          }
        });
      });

      if (!hasAnimatedRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top center',
          onEnter: () => {
            if (hasAnimatedRef.current) return;
            hasAnimatedRef.current = true;

            cardRefs.current.forEach((row, rowIndex) => {
              row.forEach((card, cardIndex) => {
                if (card) {
                  gsap.to(card, {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power3.out',
                    delay: rowIndex * 0.3 + cardIndex * 0.2,
                  });
                }
              });
            });
          },
        });
      }
    }
  });

  return (
    <div ref={containerRef} className={rootClassName}>
      {rows.map((texts, rowIndex) => (
        <div
          key={rowIndex}
          className={classNames(styles.row, {
            [styles.evenRow]: rowIndex % 2 === 1,
          })}
        >
          {texts.map((text, index) => (
            <div
              key={index}
              ref={(el) => {
                if (!cardRefs.current[rowIndex]) cardRefs.current[rowIndex] = [];
                if (el) cardRefs.current[rowIndex][index] = el;
              }}
              className={classNames(styles.card, {
                [styles.evenCard]: index % 2 === 1, // Класс для каждой второй карточки
              })}
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
