'use client'

import { FC, useState } from 'react';
import classNames from 'classnames';

import styles from './buildim.module.scss';
import { BuildimProps } from './buildim.types';
import { BuildimAstronaut, BuildimCards } from '@/components';
import { Modal, TitleGradient } from '@/ui';

const Buildim: FC<BuildimProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className);

  // Состояние для текущей активной картинки
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);


  return (
    <div className={rootClassName}>
      {/* Передаем функцию управления состоянием в BuildimCards */}
      <h1 className={styles.title}>
        <TitleGradient className="title__large title__vacancy" text="Собрали лучших и продолжаем искать" />
      </h1>

      <button onClick={() => setModalOpen(true)}>Открыть модальное окно</button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2><TitleGradient text={'Media buyer'} /></h2>
        <p>Здесь может быть любой контент.</p>
      </Modal>
      <BuildimCards onHoverCard={setActiveImage} onClick={() => setModalOpen(true)} />

      {/* Передаем активную картинку в BuildimAstronaut */}
      <BuildimAstronaut activeImage={activeImage} />
    </div>
  );
};

export default Buildim;
