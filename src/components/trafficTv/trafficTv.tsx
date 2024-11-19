import { FC } from 'react';
import classNames from 'classnames';

import styles from './trafficTv.module.scss';
import { TrafficTvProps } from './trafficTv.types';
import { TrafficRows } from '../trafficRows';
import { TrafficSound } from '../trafficSound';
import { TrafficGraphic } from '../trafficGraphic';
import { TrafficRgb } from '../trafficRgb';
import { TrafficCircle } from '../trafficCircle';

const TrafficTv: FC<TrafficTvProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);

  return (
    <div className={rootClassName}>
      <div className={styles.itemmergedvertical}>
        <TrafficRgb />
      </div>
      <div className={styles.item}>
        <TrafficRows />
        <TrafficSound />
      </div>
      <div className={styles.item}>
        <TrafficCircle />
      </div>
      <div className={styles.itemmergedhorizontal}>
        <TrafficGraphic />
      </div>
    </div>
  );
};

export default TrafficTv;
