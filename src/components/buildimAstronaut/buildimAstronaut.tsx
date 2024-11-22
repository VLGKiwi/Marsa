import { FC } from 'react';
import classNames from 'classnames';

import styles from './buildimAstronaut.module.scss';
import { BuildimAstronautProps } from './buildimAstronaut.types';
import Image from 'next/image';

const BuildimAstronaut: FC<BuildimAstronautProps> = ({ className, activeImage }) => {
  const rootClassName = classNames(styles.root, className);

  return (
    <div className={rootClassName}>
      {activeImage ? (
        // Если есть активная картинка, рендерим её
        <Image
          src={`@public/images/${activeImage}.png`}
          width={749}
          height={642}
          alt="Active Astronaut"
          className={styles.image}
        />
      ) : (
        // Если нет активной картинки, отображаем заглушку
        <p className={styles.placeholder}>Hover over a card to see the astronaut</p>
      )}
    </div>
  );
};

export default BuildimAstronaut;
