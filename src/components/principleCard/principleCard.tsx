'use client';
import { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';

import styles from './principleCard.module.scss';
import { PrincipleCardProps } from './principleCard.types';

const PrincipleCard: FC<PrincipleCardProps> = ({
  className,
  title,
  description,
  number,
}) => {
  const rootClassName = classNames(styles.root, className);
  const svgRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (svgRef.current && contentRef.current) {
      const paths = svgRef.current.querySelectorAll('path');
      const ellipses = svgRef.current.querySelectorAll('ellipse');
      const rects = svgRef.current.querySelectorAll('rect');
      const lines = svgRef.current.querySelectorAll(
        'path[fill-opacity="0.3"]'
      ); // Выбираем полоски
      const triangle = svgRef.current.querySelector(
        'path[d="M730.544 261.443L713.523 278.454H730.544V261.443Z"]'
      ); // Выбираем треугольник

      const titleElement = contentRef.current.querySelector(`.${styles.title}`);
      const numberElement = contentRef.current.querySelector(
        `.${styles.number}`
      );
      const descriptionElement = contentRef.current.querySelector(
        `.${styles.description}`
      );

      // Создаем таймлайн для последовательной анимации
      const timeline = gsap.timeline();

      // Анимация полосок (lines)
      timeline.fromTo(
        lines,
        { fillOpacity: 0 },
        { fillOpacity: 0.3, duration: 0.5, stagger: 0.05 }
      );

      // Анимация paths
      timeline.fromTo(
        paths,
        { strokeDasharray: '1000', strokeDashoffset: '1000' },
        { strokeDashoffset: '0', duration: 1, stagger: 0.05 }
      );

      // Анимация ellipses
      timeline.fromTo(
        ellipses,
        { scale: 0, transformOrigin: 'center' },
        { scale: 1, duration: 0.5, stagger: 0.05 },
        '+=0.2'
      );

      // Анимация rects
      timeline.fromTo(
        rects,
        { scale: 0, transformOrigin: 'center' },
        { scale: 1, duration: 0.5, stagger: 0.05 },
        '+=0.2'
      );

      // Анимация треугольника
      if (triangle) {
        timeline.fromTo(
          triangle,
          { scale: 0, opacity: 0, transformOrigin: 'center' },
          { scale: 1, opacity: 1, duration: 0.5 },
          '+=0.2'
        );
      }

      // Анимация текста
      if (titleElement && numberElement && descriptionElement) {
        timeline.fromTo(
          [titleElement, numberElement, descriptionElement],
          { opacity: 0 },
          { opacity: 1, duration: 1, stagger: 0.3 },
          '+=0.5' // Задержка перед текстом
        );
      }
    }
  }, []);

  return (
    <div className={rootClassName}>
      <div ref={contentRef} className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.number}>{`{${number.toString().padStart(2, '0')}}`}</div>
        <p className={styles.description}>{description}</p>
      </div>
      <svg
        ref={svgRef}
        width="738"
        height="378"
        viewBox="0 0 738 378"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >


        {/* <!-- Верхние палочки начало --> */}


        <path d="M298.569 1H288.592H288.005L317.351 30.3292H327.916L298.569 1Z" fill="#6DCEFF" fill-opacity="0.3"/>
        <path d="M319.112 1H309.134H308.547L337.893 30.3292H348.458L319.112 1Z" fill="#6DCEFF" fill-opacity="0.3"/>
        <path d="M339.654 1H329.676H329.089L358.436 30.3292H369L339.654 1Z" fill="#6DCEFF" fill-opacity="0.3"/>
        <path d="M360.196 1H350.219H349.632L378.978 30.3292H389.542L360.196 1Z" fill="#6DCEFF" fill-opacity="0.3"/>
        <path d="M380.738 1H370.761H370.174L399.52 30.3292H410.085L380.738 1Z" fill="#6DCEFF" fill-opacity="0.3"/>
        <path d="M401.281 1H391.303H390.716L420.062 30.3292H430.627L401.281 1Z" fill="#6DCEFF" fill-opacity="0.3"/>


        {/* <!-- Верхние палочки конец --> */}


        <g filter="url(#filter0_b_862_97)">


        {/* <!-- Фон конец--> */}


        <path d="M63.8006 84.8814H1V242.672L24.4769 266.136V337.699L63.8006 377H209.944L265.702 322.448H474.646H700.611L737 285.493V66.6973L700.611 30.3292H308.547L279.201 1H117.211L63.8006 84.8814Z" fill="#031A2A" fill-opacity="0.3"/>


        {/* <!-- Фон конец--> */}


        {/* <!-- Контур начало --> */}


        <path d="M63.8006 84.8814H1V242.672L24.4769 266.136V337.699L63.8006 377H209.944L265.702 322.448H474.646H700.611L737 285.493V66.6973L700.611 30.3292H308.547L279.201 1H117.211L63.8006 84.8814Z" stroke="#6DCEFF" stroke-opacity="0.7" stroke-width="1.1745"/>


        {/* <!-- Контур конец --> */}


        </g>


        {/* <!-- Левая полоска начало --> */}


        <path d="M25.6506 98.9594V225.661L52.0621 252.058V328.9" stroke="#6DCEFF" stroke-opacity="0.3" stroke-width="1.1745"/>


        {/* <!-- Левая полоска конец --> */}


        <g filter="url(#filter1_d_862_97)">


        {/* <!-- Правый треугольник начало --> */}


        <path d="M730.544 261.443L713.523 278.454H730.544V261.443Z" fill="#F0F3F7"/>


        {/* <!-- Правый треугольник конец --> */}




        {/* <!-- Верхняя полоса начало --> */}


        </g>
        <path d="M252.79 22.7036L286.244 56.1388H702.372" stroke="#6DCEFF" stroke-opacity="0.3" stroke-width="1.1745"/>


        {/* <!-- Верхняя полоса конец --> */}


        <g filter="url(#filter2_d_862_97)">


        {/* <!-- Кружки начало --> */}


        <ellipse cx="104.885" cy="359.989" rx="6.45614" ry="6.45242" fill="#F0F3F7"/>
        </g>
        <g filter="url(#filter3_d_862_97)">
        <ellipse cx="127.188" cy="359.989" rx="6.45614" ry="6.45242" fill="#F0F3F7"/>
        </g>
        <g filter="url(#filter4_d_862_97)">
        <ellipse cx="149.491" cy="359.989" rx="6.45614" ry="6.45242" fill="#F0F3F7"/>


        {/* <!-- Кружки конец --> */}


        </g>


        {/* <!-- Квадраты начало --> */}


        <rect x="5.10874" y="90.1613" width="8.21625" height="8.21083" fill="#F0F3F7" stroke="#F0F3F7" stroke-width="1.1745"/>
        <rect x="5.10874" y="119.491" width="8.21625" height="8.21083" fill="#F0F3F7" stroke="#F0F3F7" stroke-width="1.1745"/>
        <rect x="5.10874" y="148.82" width="8.21625" height="8.21083" fill="#F0F3F7" stroke="#F0F3F7" stroke-width="1.1745"/>
        <rect x="5.10874" y="133.569" width="8.21625" height="8.21083" stroke="#F0F3F7" stroke-width="1.1745"/>
        <rect x="5.10874" y="104.239" width="8.21625" height="8.21083" stroke="#F0F3F7" stroke-width="1.1745"/>
        <rect x="5.10874" y="164.071" width="8.21625" height="8.21083" fill="#F0F3F7" stroke="#F0F3F7" stroke-width="1.1745"/>


        {/* <!-- Квадраты конец --> */}


        <defs>
        <filter id="filter0_b_862_97" x="-11.5873" y="-11.5873" width="761.175" height="401.174" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="6"/>
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_862_97"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_862_97" result="shape"/>
        </filter>
        <filter id="filter1_d_862_97" x="706.359" y="254.279" width="31.3497" height="31.3398" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="3.58223"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 0 0.968627 0 0 0 1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_862_97"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_862_97" result="shape"/>
        </filter>
        <filter id="filter2_d_862_97" x="91.2645" y="346.372" width="27.2412" height="27.2338" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="3.58223"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 0 0.968627 0 0 0 1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_862_97"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_862_97" result="shape"/>
        </filter>
        <filter id="filter3_d_862_97" x="113.568" y="346.372" width="27.2412" height="27.2338" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="3.58223"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 0 0.968627 0 0 0 1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_862_97"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_862_97" result="shape"/>
        </filter>
        <filter id="filter4_d_862_97" x="135.871" y="346.372" width="27.2412" height="27.2338" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset/>
        <feGaussianBlur stdDeviation="3.58223"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.941176 0 0 0 0 0.952941 0 0 0 0 0.968627 0 0 0 1 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_862_97"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_862_97" result="shape"/>
        </filter>
        </defs>
      </svg>
    </div>
  );
};

export default PrincipleCard;