'use client';

import { FC, useState } from 'react';
import classNames from 'classnames';

import styles from './buildimCards.module.scss';
import { BuildimCardsProps } from './buildimCards.types';
import BuildimCard from '../buildimCard/buildimCard';

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

const BuildimCards: FC<BuildimCardsProps> = ({ className, onHoverCard }) => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const rootClassName = classNames(styles.root, className);

  const handleMouseEnter = (hoverKey: string, iconName: string) => {
    onHoverCard(hoverKey); // Сохраняем текущий функционал
    setActiveIcon(`${iconName}-active`); // Изменяем значение iconName
  };

  if (window.innerWidth < 1200) {
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
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
        >
          <SwiperSlide>
            <div
              onMouseEnter={() => handleMouseEnter('first', 'first')}
            >
              <BuildimCard
                className="custom-class"
                iconName={activeIcon === 'first-active' ? 'first-active' : 'third'}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              onMouseEnter={() => handleMouseEnter('second', 'second')}
            >
              <BuildimCard
                iconName={activeIcon === 'second-active' ? 'second-active' : 'second'}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              onMouseEnter={() => handleMouseEnter('third', 'third')}
            >
              <BuildimCard
                iconName={activeIcon === 'third-active' ? 'third-active' : 'first'}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    );
  } else {
    return (
      <div className={rootClassName}>
        <div
          onMouseEnter={() => handleMouseEnter('first', 'first')}
        >
          <BuildimCard
            className="custom-class"
            iconName={activeIcon === 'first-active' ? 'first-active' : 'third'}
          />
        </div>
        <div
          onMouseEnter={() => handleMouseEnter('second', 'second')}
        >
          <BuildimCard
            iconName={activeIcon === 'second-active' ? 'second-active' : 'second'}
          />
        </div>
        <div
          onMouseEnter={() => handleMouseEnter('third', 'third')}
        >
          <BuildimCard
            iconName={activeIcon === 'third-active' ? 'third-active' : 'first'}
          />
        </div>
      </div>
    );
  };
};

export default BuildimCards;
