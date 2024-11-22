'use client'

import { FC, useState } from 'react';
import classNames from 'classnames';

import styles from './buildim.module.scss';
import { BuildimProps } from './buildim.types';
import { BuildimAstronaut, BuildimCards } from '@/components';
import { TitleGradient } from '@/ui';

const Buildim: FC<BuildimProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);

  // Состояние для текущей активной картинки
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <div className={rootClassName}>
      {/* Передаем функцию управления состоянием в BuildimCards */}
      <TitleGradient className="title__large title__vacancy" text="Собрали лучших и продолжаем искать" />
      <BuildimCards onHoverCard={setActiveImage} />

      {/* Передаем активную картинку в BuildimAstronaut */}
      <BuildimAstronaut activeImage={activeImage} />
    </div>
  );
};

export default Buildim;
