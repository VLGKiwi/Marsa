'use client';

import { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './principle.module.scss';
import { PrincipleProps } from './principle.types';
import { GradientBlur, TitleGradient } from '@/ui';
import PrincipleCard from '../../components/principleCard/principleCard';
import { Language, useLanguage } from '@/service/language';

type Translations = Record<
  Language,
  {
    title: string;
    principles: { number: number; title: string; description: string }[];
  }
>;

const translations: Translations = {
  ru: {
    title: 'Наши принципы',
    principles: [
      { number: 1, title: 'Результат важнее процесса', description: 'Мы верим в то, что действительно важно — это то, что ты создаешь. Здесь ценят тех, кто фокусируется на конечных результатах, а не просто выполняет задачи' },
      { number: 2, title: 'Ты — автор своих достижений', description: 'У нас каждый может взять инициативу в свои руки и быть лидером своих успехов. Видишь задачу — бери и доводи до отличного результата.' },
      { number: 3, title: 'Расти вместе с нами', description: 'Мы ценим честность и прямоту во всём. Здесь ты можешь быть собой и говорить прямо, зная, что тебя услышат и поддержат.' },
      { number: 4, title: 'Открытость — наш стиль', description: 'Мы верим в то, что действительно важно — это то, что ты создаешь. Здесь ценят тех, кто фокусируется на конечных результатах, а не просто выполняет задачи' },
      { number: 5, title: 'Постоянные изменения — это наша рутина', description: 'Мы живем в мире перемен и считаем их частью нашего роста. Если тебе нравится учиться новому и двигаться вперед — ты найдешь здесь единомышленников.' },
    ],
  },
  en: {
    title: 'Our principles',
    principles: [
      { number: 1, title: 'Results over process', description: 'We believe what truly matters is what you create. We value those who focus on final outcomes, not just task completion.' },
      { number: 2, title: 'You are the author of your achievements', description: 'Here, everyone has the freedom to take initiative and lead their own success. See a task? Take it on and bring it to excellence.' },
      { number: 3, title: 'Constant change Is our routine', description: 'We live in a world of change and embrace it as part of our growth. If you love learning and moving forward, you’ll find like-minded people here.' },
      { number: 4, title: 'Grow with us', description: 'We foster an environment where growth is a natural path. We believe in becoming better every day and support and train only the strongest.' },
      { number: 5, title: 'Openness is our style', description: 'We value honesty and directness in everything. Here, you can be yourself and speak openly, knowing you’ll be heard and supported.' },
    ],
  },
};

const AUTO_CHANGE_INTERVAL = 7000; // Интервал смены карточек (мс)
const START_DELAY = 8000; // Задержка перед стартом слайдера (10 сек анимация + 5 сек пауза)

const Principle: FC<PrincipleProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0); // Текущая карточка
  const [animationStage, setAnimationStage] = useState<'entering' | 'exiting'>(
    'entering'
  ); // Стадия анимации

  const audioRef = useRef<HTMLAudioElement | null>(null); // Реф для аудио

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }

    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimationStage('exiting'); // Устанавливаем стадию "исчезновение"
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % translations[language].principles.length); // Сменяем индекс карточки
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
  }, [language]);

  return (
    <div className={rootClassName}>
      <GradientBlur className={styles.gradient} />
      <h2 className={styles.title}>
        <TitleGradient text={translations[language].title} />
      </h2>
      <div className={styles.principleCards}>
        {translations[language].principles.map((card, index) => (
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
      <audio
        ref={audioRef}
        src="https://infodevelopmentpreview.ru/sword__sound.mp3"
        preload="auto"
      />
    </div>
  );
};

export default Principle;
