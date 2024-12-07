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

const BuildimCards: FC<BuildimCardsProps> = ({ className, onHoverCard }) => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const rootClassName = classNames(styles.root, className);

  // Функция для обновления activeIcon и передачи значения в родительский компонент
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSlideChange = (swiper: any) => {
    const realIndex = swiper.realIndex; // Получаем реальный индекс слайда
    console.log('Active Slide Real Index:', realIndex);
    switch(realIndex) {
      case 0:
        setActiveIcon('first-active');
        onHoverCard('first'); // Передаём значение в родительский компонент
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

  useEffect(() => {
    // При монтировании компонента, устанавливаем активный слайд
    // Это нужно, чтобы установить правильный initial activeIcon и activeImage
  }, []);

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
            autoplay: false, // Отключаем автоплей на больших экранах
          },
        }}
        onSlideChange={handleSlideChange}
        onInit={(swiper) => handleSlideChange(swiper)}
      >
        <SwiperSlide className={styles.swiperSlide}>
          <div
            onMouseEnter={() => handleSlideChange({ realIndex: 0 })} // Для десктопа
            onClick={() => handleSlideChange({ realIndex: 0 })} // Для мобильных устройств
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
            onClick={() => handleSlideChange({ realIndex: 1 })}
          >
            <BuildimCard
              iconName={activeIcon === 'second-active' ? 'second-active' : 'second'}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <div
            onMouseEnter={() => handleSlideChange({ realIndex: 2 })}
            onClick={() => handleSlideChange({ realIndex: 2 })}
          >
            <BuildimCard
              iconName={activeIcon === 'third-active' ? 'third-active' : 'first'}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BuildimCards;
