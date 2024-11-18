'use client'

import { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './trafficRows.module.scss';
import { TrafficRowsProps } from './trafficRows.types';

gsap.registerPlugin(ScrollTrigger);

const TrafficRows: FC<TrafficRowsProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const slidersRef = useRef<(HTMLInputElement | null)[]>([]); // Для доступа к ползункам

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${styles.root}`,
        start: 'top center', // Начало триггера (когда верхняя часть компонента достигает центра экрана)
        end: 'bottom center', // Конец триггера (когда нижняя часть компонента достигает центра экрана)
        scrub: true, // Привязка анимации к скроллу
      },
    });

    slidersRef.current.forEach((slider, index) => {
      if (slider) {
        tl.to(
          slider,
          {
            value: 100, // Движение вправо
            duration: 1,
            repeat: -1, // Бесконечное движение
            yoyo: true, // Возврат назад (движение влево)
            ease: 'power1.inOut',
          },
          index * 0.2 // Смещение начала анимации для каждого слайдера
        );
      }
    });
  }, []);

  return (
    <div className={rootClassName}>
      {[...Array(5)].map((_, index) => (
        <input
          key={index}
          ref={(el) => (slidersRef.current[index] = el)}
          type="range"
          min="0"
          max="100"
          defaultValue="50"
          className={styles.slider}
          disabled // Отключаем возможность взаимодействия
        />
      ))}
    </div>
  );
};

export default TrafficRows;
