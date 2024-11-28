import { FC } from 'react';
import classNames from 'classnames';

import styles from './principleCards.module.scss';
import { PrincipleCardsProps } from './principleCards.types';
import PrincipleCard from '../principleCard/principleCard';

const PrincipleCards: FC<PrincipleCardsProps> = ({ className, cards }) => {
  const rootClassName = classNames(styles.root, className);

  return (
    <div className={rootClassName}>
      {cards.map((card, index) => (
        <PrincipleCard
          key={index}
          number={card.number}
          title={card.title}
          description={card.description}
          className={styles.card}
        />
      ))}
    </div>
  );
};

export default PrincipleCards;
