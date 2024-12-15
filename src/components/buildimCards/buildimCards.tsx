/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
'use client';

import { FC, useState, useEffect } from 'react';
import classNames from 'classnames';

import styles from './buildimCards.module.scss';
import { BuildimCardsProps } from './buildimCards.types';
import BuildimCard from '../buildimCard/buildimCard';

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Modal } from '@/ui';

const BuildimCards: FC<BuildimCardsProps> = ({ className, onHoverCard }) => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const rootClassName = classNames(styles.root, className);

  const handleSlideChange = (swiper: any) => {
    const realIndex = swiper.realIndex;
    switch (realIndex) {
      case 0:
        setActiveIcon('first-active');
        onHoverCard('first');
        break;
      case 1:
        setActiveIcon('second-active');
        onHoverCard('second');
        break;
      case 2:
        setActiveIcon('third-active');
        onHoverCard('third');
        break;
      default:
        setActiveIcon(null);
        onHoverCard(null);
    }
  };

  const handleCardClick = (cardName: string) => {
    setSelectedCard(cardName);
    setIsModalOpen(true);
  };

  return (
    <div className={rootClassName}>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          359: {
            slidesPerView: 1.5,
            spaceBetween: 20,
            navigation: true,
            pagination: { clickable: true },
            scrollbar: { draggable: true },
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
            navigation: true,
            pagination: { clickable: true },
            scrollbar: { draggable: true },
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 30,
            navigation: false,
            pagination: false,
            scrollbar: false,
            autoplay: false,
          },
        }}
        onSlideChange={handleSlideChange}
        onInit={(swiper) => handleSlideChange(swiper)}
      >
        <SwiperSlide className={styles.swiperSlide}>
          <div
            onMouseEnter={() => handleSlideChange({ realIndex: 0 })}
            onClick={() => handleCardClick('first')}
          >
            <BuildimCard
              className="custom-class"
              iconName={activeIcon === 'first-active' ? 'first-active' : 'third'}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <div
            onMouseEnter={() => handleSlideChange({ realIndex: 1 })}
            onClick={() => handleCardClick('second')}
          >
            <BuildimCard
              iconName={activeIcon === 'second-active' ? 'second-active' : 'second'}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <div
            onMouseEnter={() => handleSlideChange({ realIndex: 2 })}
            onClick={() => handleCardClick('third')}
          >
            <BuildimCard
              iconName={activeIcon === 'third-active' ? 'third-active' : 'first'}
            />
          </div>
        </SwiperSlide>
      </Swiper>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {/* Заголовок */}
          <div className={styles.modalHeader}>
            {/* Заголовок h2 */}
            <h2 className={styles.modalTitle}>
              {selectedCard === 'first' && 'Media buyer'}
              {selectedCard === 'second' && 'Team lead'}
              {selectedCard === 'third' && 'Designer'}
            </h2>

            {/* Блок с SVG отображается только для первой и третьей карточки */}
            {(selectedCard === 'first' || selectedCard === 'third') && (
              <div className={styles.modalIcons}>
                <svg className={styles.icon} width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
                </svg>
                <svg className={styles.icon} width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" stroke="#fff" strokeWidth="2" />
                </svg>
              </div>
            )}
          </div>

          {/* Основной текст */}
          <div className={styles.modalText}>
            {selectedCard === 'first' && (
              <>
                <p>Ищем проактивного медиабайера, готового принять вызов и стать частью лидирующей команды в медиабаинге в вертикале iGaming.

Если ты ищешь среду, где трудности превращаются в возможности для роста, готов брать на себя ответственность и находить уникальные решения сложных задач – ты наш человек.

Мы не обучаем с нуля, но если ты покажешь, что способен мыслить нестандартно, брать ответственность и добиваться реальных результатов, мы дадим тебе все ресурсы для дальнейшего развития.</p>
              </>
            )}
            {selectedCard === 'second' && (
              <>
                <p>Ищем тимлида, который не боится сложных вызовов и готов возглавить команду, постоянно стремится к высоким результатам.

У нас тебя ждут амбициозные задачи, требующие нестандартного подхода и сильного лидерства. Мы поддерживаем тех, кто готов преодолевать трудности, находить новые пути и нести ответственность за результат.

Это не просто работа – это вызов для тех, кто стремится быть лучшим.</p>
              </>
            )}
            {selectedCard === 'third' && (
              <>
                <p>Мы в поисках креативного дизайнера, который готов работать в динамичной среде и создавать визуальные решения, привлекать внимание на международных рынках.

Если ты обладаешь чувством стиля и умеешь делать креативы, которые цепляют с первого взгляда – нам нужен именно ты!</p>
              </>
            )}
          </div>

          {/* Первый блок */}
          <div className={styles.modalSection}>
            <h3 className={styles.modalSubtitle}>Что ты будешь делать:</h3>
            <ul className={styles.modalList}>
              {selectedCard === 'first' && (
                <>
                  <li>Управление рекламными кампаниями в выбранном направлении: FB, Google, In-App, Push, ASO, SEO, TikTok, УБТ, TG ads, SMS и др.</li>
                  <li>Оптимизация бюджета и достижение максимального ROI</li>
                  <li>Анализ и тестирование креативов, создание новых решений</li>
                  <li>Поиск и использование новых источников трафика и возможностей для роста</li>
                </>
              )}
              {selectedCard === 'second' && (
                <>
                  <li>Управление командой в выбранном направлении: FB, Google, In-App, Push, ASO, SEO, TikTok, УБТ, TG ads, SMS и др.</li>
                  <li>Постановка задач, контроль их выполнения и обеспечение достижения целей</li>
                  <li>Создание стратегий, которые помогут команде достигать новых высот</li>
                  <li>Поиск уникальных решений и развитие талантов внутри команды</li>
                </>
              )}
              {selectedCard === 'third' && (
                <>
                  <li>Разработка графики и креативов для рекламных кампаний</li>
                  <li>Взаимодействие с медиабайерами и другими отделами для создания визуальных решений</li>
                  <li>	Улучшение дизайна текущих проектов и создание новых концепций</li>
                </>
              )}
            </ul>
          </div>

          {/* Второй блок */}
          <div className={styles.modalSection}>
            <h3 className={styles.modalSubtitle}>Что мы ждём от тебя:</h3>
            <ul className={styles.modalList}>
              {selectedCard === 'first' && (
                <>
                  <li>Опыт работы в одном из направлений: FB, Google, In-App, Push и др.</li>
                  <li>Способность принимать вызовы, преодолевать трудности и предлагать решения</li>
                  <li>Проактивность, инициативность и готовность брать ответственность за результаты</li>
                </>
              )}
              {selectedCard === 'second' && (
                <>
                  <li>Опыт управления командой в одном из направлений</li>
                  <li>Способность принимать сложные вызовы и вести команду к успеху</li>
                  <li>Умение мыслить креативно и разрабатывать новые стратегии</li>
                </>
              )}
              {selectedCard === 'third' && (
                <>
                  <li>Опыт работы в сфере дизайна, желательно в digital и рекламе</li>
                  <li>Умение создавать визуальные концепты, которые соответствуют целевой аудитории</li>
                  <li>Творческое мышление и готовность к работе в команде</li>
                </>
              )}
            </ul>
          </div>
      </Modal>

    </div>
  );
};

export default BuildimCards;
