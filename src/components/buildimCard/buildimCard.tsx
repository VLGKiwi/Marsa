import { FC } from 'react';
import classNames from 'classnames';

import styles from './buildimCard.module.scss';
import { BuildimCardProps } from './buildimCard.types';

import CardFirst from '@icons/vacancy-card-first.svg';
import CardSecond from '@icons/vacancy-card-second.svg';
import CardThird from '@icons/vacancy-card-third.svg';
import CardFourth from '@icons/vacancy-card-fourth.svg';

import CardFirstActive from '@icons/vacancy-card-first-active.svg';
import CardSecondActive from '@icons/vacancy-card-second-active.svg';
import CardThirdActive from '@icons/vacancy-card-third-active.svg';
import CardFourthActive from '@icons/vacancy-card-fourth-active.svg';

type IconName = 'first' | 'second' | 'third' | 'fourth' | 'first-active' | 'second-active' | 'third-active' | 'fourth-active';
type SvgComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

// Обновленный объект для маппинга SVG
const SVG_MAP: Record<IconName, SvgComponent> = {
  first: CardFirst,
  second: CardSecond,
  third: CardThird,
  fourth: CardFourth,
  'first-active': CardFirstActive,
  'second-active': CardSecondActive,
  'third-active': CardThirdActive,
  'fourth-active': CardFourthActive,
};

const BuildimCard: FC<BuildimCardProps> = ({ className, iconName = 'first' }) => {
  const rootClassName = classNames(styles.root, className);

  // Выбираем нужную SVG на основе iconName
  const SelectedIcon = iconName ? SVG_MAP[iconName as IconName] : SVG_MAP.first;

  // Проверяем наличие иконки
  if (!SelectedIcon) {
    console.error(`Icon with name "${iconName}" not found in SVG_MAP.`);
    return null;
  }

  return (
    <div className={rootClassName}>
      <SelectedIcon width={238} height={150} />
    </div>
  );
};

export default BuildimCard;
