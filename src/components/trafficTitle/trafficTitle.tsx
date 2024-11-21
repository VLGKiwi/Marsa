// TrafficTitle.tsx
import { FC } from 'react';
import classNames from 'classnames';

import styles from './trafficTitle.module.scss';
import { TrafficTitleProps } from './trafficTitle.types';
import Square from '../../shared/assets/icons/square.svg'

const TrafficTitle: FC<TrafficTitleProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);

  return (
    <div className={rootClassName}>
      <div className={styles.icon}><Square /></div>
      <span className={styles.text}>ТОЧНАЯ НАВИГАЦИЯ В МИРЕ ТРАФИКА</span>
    </div>
  );
};

export default TrafficTitle;
