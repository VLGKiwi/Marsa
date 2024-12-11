'use client'

import { FC } from 'react';
import classNames from 'classnames';

import styles from './trafficRgb.module.scss';
import { TrafficRgbProps } from './trafficRgb.types';

// Импорт SVG-файлов
import SvgGreen from '@icons/green.svg';
import SvgYellow from '@icons/yellow.svg';
import SvgRed from '@icons/red.svg';
import SvgLine from '@icons/line.svg';

const TrafficRgb: FC<TrafficRgbProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);

  return (
    <div className={rootClassName}>
      {/* Первый SVG */}
      <SvgGreen className={styles.svg} alt="Green Graphic" width={'100%'} height={100} />

      {/* Второй SVG */}
      <SvgYellow className={styles.svg} alt="Yellow Graphic" width={'100%'} height={100} />

      {/* Третий SVG */}
      <SvgRed className={styles.svg} alt="Red Graphic" width={'100%'} height={100} />
      <SvgLine alt="Line" className={styles.line} width={88} height={172} />
      <p className={styles.text}><span className={styles.textwhite}>Снижаем риски</span> с помощью подробного расчета экономики заливов</p>
    </div>
  );
};

export default TrafficRgb;
