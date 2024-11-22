'use client'

import { FC, useState } from 'react';
import classNames from 'classnames';

import styles from './buildim.module.scss';
import { BuildimProps } from './buildim.types';
import { BuildimAstronaut, BuildimCards, BuildimLightning } from '@/components';

const Buildim: FC<BuildimProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);

  // Состояние для текущей активной картинки
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <div className={rootClassName}>
      <BuildimLightning />

      {/* Передаем функцию управления состоянием в BuildimCards */}
      <BuildimCards onHoverCard={setActiveImage} />

      {/* Передаем активную картинку в BuildimAstronaut */}
      <BuildimAstronaut activeImage={activeImage} />
    </div>
  );
};

export default Buildim;
