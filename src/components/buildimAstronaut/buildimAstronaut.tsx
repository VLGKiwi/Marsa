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
          src={`/images/${activeImage}.png`}
          width={1200}
          height={700}
          quality={100}
          alt="Active Astronaut"
          className={styles.image}
        />
      ) : (
        // Если нет активной картинки, отображаем заглушку
        <Image
          src={`/images/first.png`}
          width={1200}
          height={700}
          quality={100}
          alt="Active Astronaut"
          className={styles.image}
        />
      )}
    </div>
  );
};

export default BuildimAstronaut;
