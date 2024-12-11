'use client';

import { FC, useState } from 'react';
import styles from './pointMob.module.scss';

const Point: FC = () => {
  const [activePoint, setActivePoint] = useState<number | null>(null);

  const points = [
    { id: 1, text: 'Точка 1: Информация о Facebook и Google Ads' },
    { id: 2, text: 'Точка 2: Информация о TikTok и CPA-сетях' },
    { id: 3, text: 'Точка 3: ASO и продвижение приложений' },
    { id: 4, text: 'Точка 4: Яндекс.Директ и контекстная реклама' },
    { id: 5, text: 'Точка 5: SEO продвижение бизнеса' },
    { id: 6, text: 'Точка 6: Email маркетинг и автоматизация' },
  ];

  const handlePointClick = (id: number) => {
    setActivePoint((prev) => (prev === id ? null : id)); // Закрывает карточку при повторном клике
  };

  return (
    <div className={styles.root}>
      {/* Линия с точками */}
      <div className={styles.pointsRow}>
        {points.map((point) => (
          <div
            key={point.id}
            className={`${styles.point} ${activePoint === point.id ? styles.active : ''}`}
            onClick={() => handlePointClick(point.id)}
          >
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.21775 6.98619L13.5 0.472377L24.7823 6.98619V20.0138L13.5 26.5276L2.21775 20.0138V6.98619Z"
                stroke="#F0F3F7"
                strokeWidth="0.818182"
              />
              <path
                d="M13.5 4.90918L20.9399 9.20463V17.7955L13.5 22.091L6.06002 17.7955V9.20463L13.5 4.90918Z"
                fill="#F0F3F7"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Карточка */}
      <div className={styles.card}>
        {activePoint !== null && (
          <div className={styles.cardContent}>
            <h3>Заголовок {activePoint}</h3>
            <p>{points.find((point) => point.id === activePoint)?.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Point;
