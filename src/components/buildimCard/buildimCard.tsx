import { FC } from 'react';
import classNames from 'classnames';

import styles from './buildimCard.module.scss';
import { BuildimCardProps } from './buildimCard.types';

import CardFirst from '@icons/vacancy-card-first.svg';
import CardSecond from '@icons/vacancy-card-second.svg';
import CardThird from '@icons/vacancy-card-third.svg';

// Создаем объект для маппинга SVG
const SVG_MAP = {
  first: CardFirst,
  second: CardSecond,
  third: CardThird,
};

const BuildimCard: FC<BuildimCardProps> = ({ className, iconName }) => {
  const rootClassName = classNames(styles.root, className);

  // Выбираем нужную SVG на основе iconName
  const SelectedIcon = SVG_MAP[iconName];

  return (
    <div className={rootClassName}>
      {/* Рендерим выбранную SVG */}
      <SelectedIcon alt="Graphic Icon" width="100%" height={100} />
    </div>
  );
};

export default BuildimCard;
