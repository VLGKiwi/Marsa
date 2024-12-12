'use client';

import { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './principle.module.scss';
import { PrincipleProps } from './principle.types';
import { GradientBlur, TitleGradient } from '@/ui';
import PrincipleCard from '../../components/principleCard/principleCard';
import Sound from './sword__sound.mp3'

const principles = [
  { number: 1, title: 'Результат важнее процесса', description: 'Мы верим в то, что действительно важно — это то, что ты создаешь. Здесь ценят тех, кто фокусируется на конечных результатах, а не просто выполняет задачи' },
  { number: 2, title: 'Ты — автор своих достижений', description: 'У нас каждый может взять инициативу в свои руки и быть лидером своих успехов. Видишь задачу — бери и доводи до отличного результата.' },
  { number: 3, title: 'Расти вместе с нами', description: 'Мы ценим честность и прямоту во всём. Здесь ты можешь быть собой и говорить прямо, зная, что тебя услышат и поддержат.' },
  { number: 4, title: 'Открытость — наш стиль', description: 'Мы верим в то, что действительно важно — это то, что ты создаешь. Здесь ценят тех, кто фокусируется на конечных результатах, а не просто выполняет задачи' },
  { number: 5, title: 'Постоянные изменения — это наша рутина', description: 'Мы живем в мире перемен и считаем их частью нашего роста. Если тебе нравится учиться новому и двигаться вперед — ты найдешь здесь единомышленников.' },
];

const AUTO_CHANGE_INTERVAL = 7000; // Интервал смены карточек (мс)
const START_DELAY = 8000; // Задержка перед стартом слайдера (10 сек анимация + 5 сек пауза)

const Principle: FC<PrincipleProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const [currentIndex, setCurrentIndex] = useState(0); // Текущая карточка
  const [animationStage, setAnimationStage] = useState<'entering' | 'exiting'>(
    'entering'
  ); // Стадия анимации

  const audioRef = useRef<HTMLAudioElement | null>(null); // Реф для аудио

  useEffect(() => {
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimationStage('exiting'); // Устанавливаем стадию "исчезновение"
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % principles.length); // Сменяем индекс карточки
          setAnimationStage('entering'); // Устанавливаем стадию "появление"

          // Воспроизводим звук при появлении карточки
          if (audioRef.current) {
            audioRef.current.currentTime = 0; // Сбрасываем звук
            audioRef.current.play().catch((err) => {
              console.error('Ошибка воспроизведения звука:', err);
            });
          }
        }, 500); // Задержка для синхронизации анимации
      }, AUTO_CHANGE_INTERVAL);

      return () => clearInterval(interval);
    }, START_DELAY);

    return () => clearTimeout(startTimer);
  }, []);

  return (
    <div className={rootClassName}>
      <GradientBlur className={styles.gradient} />
      <h2 className={styles.title}>
        <TitleGradient text="Наши принципы" />
      </h2>
      <div className={styles.principleCards}>
        {principles.map((card, index) => (
          <div
            key={index}
            className={classNames(styles.slide, {
              [styles.active]: index === currentIndex,
              [styles.entering]: index === currentIndex && animationStage === 'entering',
              [styles.exiting]: index === currentIndex && animationStage === 'exiting',
            })}
          >
            <PrincipleCard
              number={card.number}
              title={card.title}
              description={card.description}
              className={styles.card}
              isFirst={index === 0}
            />
          </div>
        ))}
      </div>
      {/* Аудио для воспроизведения звука */}
      <audio ref={audioRef} src={Sound} />
    </div>
  );
};

export default Principle;
