'use client'

import { FC } from 'react';
import classNames from 'classnames';

import styles from './buildimCards.module.scss';
import { BuildimCardsProps } from './buildimCards.types';
import BuildimCard from '../buildimCard/buildimCard';


const BuildimCards: FC<BuildimCardsProps> = ({ className, onHoverCard }) => {
  const rootClassName = classNames(styles.root, className);

  return (
    <div className={rootClassName}>
      <div
        onMouseEnter={() => onHoverCard('first')}
        onMouseLeave={() => onHoverCard(null)}
      >
        <BuildimCard className="custom-class" iconName="first" />
      </div>
      <div
        onMouseEnter={() => onHoverCard('second')}
        onMouseLeave={() => onHoverCard(null)}
      >
        <BuildimCard iconName="second" />
      </div>
      <div
        onMouseEnter={() => onHoverCard('third')}
        onMouseLeave={() => onHoverCard(null)}
      >
        <BuildimCard iconName="third" />
      </div>
    </div>
  );
};

export default BuildimCards;
