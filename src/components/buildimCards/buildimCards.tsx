'use client';

import { FC, useState } from 'react';
import classNames from 'classnames';

import styles from './buildimCards.module.scss';
import { BuildimCardsProps } from './buildimCards.types';
import BuildimCard from '../buildimCard/buildimCard';

const BuildimCards: FC<BuildimCardsProps> = ({ className, onHoverCard }) => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const rootClassName = classNames(styles.root, className);

  const handleMouseEnter = (hoverKey: string, iconName: string) => {
    onHoverCard(hoverKey); // Сохраняем текущий функционал
    setActiveIcon(`${iconName}-active`); // Изменяем значение iconName
  };

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

export default BuildimCards;
