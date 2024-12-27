'use client';

import { FC, useRef } from 'react';
import classNames from 'classnames';
import styles from './principle.module.scss';
import { PrincipleProps } from './principle.types';
import { GradientBlur, TitleGradient } from '@/ui';
import PrincipleCard from '../../components/principleCard/principleCard';
import { Language, useLanguage } from '@/service/language';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

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

const Principle: FC<PrincipleProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const slides = containerRef.current?.querySelectorAll(`.${styles.slide}`);
    console.log(slides)
    if (!slides) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=1300%',
        scrub: 1,
        pin: true
      },
    });

    slides.forEach((slide) => {
      tl.fromTo(slide, {
        xPercent: 50,
        scale: 0,
        rotateY: -180
      }, {
        scale: 1,
        xPercent: 0,
        rotateY: 0,
        ease: "power2.inOut(2)", // плавное ускорение и замедление
      });

      tl.to(slide, {
        scale: 0,
        xPercent: -50,
        delay: 0.7,
        rotateY: 180,
        ease: "back.inOut(1.7)", // добавляет небольшой "отскок"
      });
    })
  })

  return (
    <div className={rootClassName} ref={containerRef}>
      <GradientBlur className={styles.gradient} />

      <h2 className={styles.title}>
        <TitleGradient text={translations[language].title} />
      </h2>

      <div className={styles.principleCards}>
        {translations[language].principles.map((card, index) => (
          <div
            key={index}
            className={classNames(styles.slide)}
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
    </div>
  );
};

export default Principle;
