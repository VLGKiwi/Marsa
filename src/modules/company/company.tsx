'use client'

import { FC, useRef } from 'react'
import classNames from 'classnames'

import styles from './company.module.scss'
import { CompanyProps } from './company.types'
import { Disclose } from '@/ui'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Company: FC<CompanyProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  const container = useRef<HTMLDivElement>(null)
  const text = useRef<HTMLHeadingElement>(null)

  const fullText = "Управляем сложными процессами медиабаинга с помощью прогнозирования, анализа и оптимизации кампаний";
  const randomChars = "_{}#.&"; // Ограниченный набор символов

  const getRandomChar = () => {
    return randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }

  useGSAP(() => {
    const cont = container.current
    const txt = text.current

    if (!cont || !txt) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cont,
        start: 'top center',
      }
    })

    tl.fromTo(cont, {
      width: 43,
      height: 46
    }, {
      width: '100%',
      height: '100%',
      duration: 2,
    })

    tl.fromTo(txt, {
      opacity: 0
    }, {
      opacity: 1,
      duration: 2,
      onComplete: () => {
        typewriterEffect(txt)
      }
    })
  })

  const typewriterEffect = (element: HTMLElement) => {
    const spans = element.querySelectorAll('span');

    spans.forEach((span) => {
      const correctChar = span.getAttribute('data-char') || '';
      const randomIterations = 3; // Количество смен случайных символов
      const randomInterval = 0.3; // Длительность каждой смены (секунды)

      const tl = gsap.timeline({
        delay: 0 // Опционально: задержка для каждого символа
      });

      for(let i = 0; i < randomIterations; i++) {
        tl.to(span, {
          duration: randomInterval,
          onUpdate: () => {
            span.innerText = getRandomChar();
          },
          ease: 'none'
        });
      }

      tl.to(span, {
        duration: randomInterval,
        onComplete: () => {
          span.innerText = correctChar;
        },
        ease: 'none'
      });
    });
  }

  return (
    <div className={styles.company}>
      <div className={rootClassName}>
        <div className={styles.container__title} ref={container}>
          <Disclose />
          <div className={styles.title}>
            <h2 ref={text}>
              {fullText.split('').map((char, index) => (
                <span key={index} data-char={char}>
                  {getRandomChar()}
                </span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Company
