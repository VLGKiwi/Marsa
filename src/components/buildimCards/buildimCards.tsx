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
        <h2>Информация о карточке</h2>
        <p>Вы выбрали карточку: {selectedCard}</p>
      </Modal>
    </div>
  );
};

export default BuildimCards;
