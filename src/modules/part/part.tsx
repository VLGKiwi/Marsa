/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-dupe-else-if */
// src/components/Part.tsx
'use client'

import React, { FC, useRef, useEffect, useState } from 'react'
import classNames from 'classnames'

import styles from './part.module.scss'
import { PartProps } from './part.types'

import { Canvas, useFrame } from '@react-three/fiber'
import Model from '@/components/astronautAnimation/astronautAnimation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three';
import EnvironmentGLTF from '@/components/environmentGltf/environmentGltf'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { ButtonTwo, TitleGradient } from '@/ui'
import Line1 from '@icons/line1_part.svg'
import Line2 from '@icons/line2_part.svg'
import Line3 from '@icons/line3_part.svg'
import Line from '@icons/linemob_part.svg'
import Link from 'next/link'
// import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'

gsap.registerPlugin(ScrollTrigger)

const Part: FC<PartProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)
  const mascotRef = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef<number>(0)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const hasCameraMoved = useRef(false)
  const friendRef = useRef(null)
  const box1Ref = useRef(null)
  const box2Ref = useRef(null)
  const box3Ref = useRef(null)
  const teamRef = useRef(null)
  const [targetRotation, setTargetRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [isProgress, setIsProgress] = useState<boolean>(false)
  const canvasRef = useRef(null)

  // Определите коэффициент скорости
  const speedFactor = 0.1 // Меняйте значение для регулировки скорости (0.5 = вдвое медленнее)

  useEffect(() => {
    const mascot = mascotRef.current
    if (!mascot) {
      console.warn('mascotRef is null')
      return
    }

    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: teamRef.current,
    //     start: 'top center',
    //     markers: true
    //   }
    // })

    gsap.fromTo(teamRef.current, {
      opacity: 0,
      duration: 0.3
    }, {
      opacity: 1,
      duration: 0.3,
      scrollTrigger: {
        trigger: teamRef.current,
        start: 'top center',
      }
    })

    gsap.fromTo(canvasRef.current, {
      y: -1500
    }, {
      y: 0,
      delay: 3,
      duration: 1,
      overflow: 'visible',
      scrollTrigger: {
        trigger: teamRef.current,
        start: 'top center',
        markers: true
      }
    })

    function camMove(self: globalThis.ScrollTrigger) {
      scrollProgressRef.current = self.progress
      console.log('Scroll progress:', self.progress) // Для отладки

      if (self.progress >= 0.9) {
        gsap.to(friendRef.current, {
          opacity: 1,
          duration: 1,
        })

        setIsProgress(true)
        const targetY = 0.9 * Math.PI * 2; // Преобразуем в радианы
        setTargetRotation([0, targetY, 0]);
      } else if (self.progress < 1) {
        gsap.to(friendRef.current, {
          opacity: 0,
          duration: 1,
        })
      }

      // Настройка анимации для плашек
      if (self.progress >= 0.7) {
        gsap.to(box3Ref.current, {
          opacity: 0,
          duration: 1
        })
      } else if (self.progress >= 0.5) {
        gsap.to(box2Ref.current, {
          opacity: 0,
          duration: 1
        })

        gsap.to(box3Ref.current, {
          opacity: 1,
          duration: 1
        })
      } else if (self.progress >= 0.2) {
        gsap.to(box1Ref.current, {
          opacity: 0,
          duration: 1
        })

        gsap.to(box2Ref.current, {
          opacity: 1,
          duration: 1
        })

        gsap.to(box3Ref.current, {
          opacity: 0,
          duration: 1
        })
      } else if (self.progress <= 0.05) {
        gsap.to(box1Ref.current, {
          opacity: 0,
          duration: 1
        })
      } else if ((self.progress < 0.15) || (self.progress > 0.05)) {
        gsap.to(box1Ref.current, {
          opacity: 1,
          duration: 1
        })

        gsap.to(box2Ref.current, {
          opacity: 0,
          duration: 1
        })
      }

      if (window.innerWidth >= 768) {

        if (self.progress >= 0.7 && !hasCameraMoved.current) {
          hasCameraMoved.current = true
          if (cameraRef.current) {
            // Анимация камеры с помощью gsap
            gsap.to(cameraRef.current.position, {
              x: 0, // Установите нужные значения для приближения
              y: 0.13,
              z: 0.25, // Приближение к космонавту
              duration: 1,
              ease: 'power2.inOut',
              onComplete: function () { hasCameraMoved.current = false }
            })
          }
        } else if (self.progress >= 0.4 && !hasCameraMoved.current) {
          hasCameraMoved.current = true

          if (cameraRef.current) {
            // Анимация камеры с помощью gsap
            gsap.to(cameraRef.current.position, {
              x: -0.1, // Установите нужные значения для приближения
              y: 0,
              z: 0.5, // Приближение к космонавту
              duration: 1,
              ease: 'power2.inOut',
              onComplete: function () { hasCameraMoved.current = false }
            })
          }
        } else if (self.progress < 0.15 && !hasCameraMoved.current) {
          hasCameraMoved.current = true

          if (cameraRef.current) {
            // Анимация камеры с помощью gsap
            gsap.to(cameraRef.current.position, {
              x: -0.1, // Установите нужные значения для приближения
              y: 0,
              z: 0.5, // Приближение к космонавту
              duration: 1,
              ease: 'power2.inOut',
              onComplete: function () { hasCameraMoved.current = false }
            })
          }
        } else if ((self.progress >= 0.15 && !hasCameraMoved.current) || (self.progress < 0.4 && !hasCameraMoved.current)) {
          hasCameraMoved.current = true

          if (cameraRef.current) {
            // Анимация камеры с помощью gsap
            gsap.to(cameraRef.current.position, {
              x: 0.1, // Установите нужные значения для приближения
              y: 0,
              z: 0.5, // Приближение к космонавту
              duration: 1,
              ease: 'power2.inOut',
              onComplete: function () { hasCameraMoved.current = false }
            })
          }
        }
      } else {
        if (self.progress < 0.7 && !hasCameraMoved.current) {
          hasCameraMoved.current = true

          if (cameraRef.current) {
            // Анимация камеры с помощью gsap
            gsap.to(cameraRef.current.position, {
              x: 0, // Установите нужные значения для приближения
              y: 0.05,
              z: 0.5, // Приближение к космонавту
              duration: 1,
              ease: 'power2.inOut',
              onComplete: function () { hasCameraMoved.current = false }
            })
          }
        } else if (self.progress >= 0.7 && !hasCameraMoved.current) {
          hasCameraMoved.current = true
          if (cameraRef.current) {
            // Анимация камеры с помощью gsap
            gsap.to(cameraRef.current.position, {
              x: 0, // Установите нужные значения для приближения
              y: 0.13,
              z: 0.25, // Приближение к космонавту
              duration: 1,
              ease: 'power2.inOut',
              onComplete: function () { hasCameraMoved.current = false }
            })
          }
        }
      }
    }


    // Рассчитайте конец прокрутки на основе speedFactor
    const scrollEndPercentage = 100 / speedFactor // Например, 200% для speedFactor=0.5

    // Настройка ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: mascot,
      start: 'top top',
      end: `+=${scrollEndPercentage}%`, // Увеличиваем область прокрутки
      scrub: true,
      pin: true,
      markers: false, // Установите true для отладки, false для продакшена
      onUpdate: (self) => {
        camMove(self)
      },
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [speedFactor])

  if (window.innerWidth < 768) {

    return (
      <div style={{ overflow: 'hidden' }}>
        <div className={styles.team} ref={teamRef}>
          <h2>
            <TitleGradient text={'Стань частью команды'} />
          </h2>
          <p>Хочешь работать плечом к плечу с ключевыми игроками рынка? Присоединяйся к нам</p>
          <Link href='/vacancy'><ButtonTwo text={'вакансии'} /></Link>
        </div>
        <div
          className={rootClassName}
          id='mascot'
          ref={mascotRef}
          style={{ height: `${10 / speedFactor}vh`, position: 'relative' }} // Установите высоту пропорционально speedFactor
          >
          <div className={styles.box} ref={box1Ref}>
            <div className={styles.box__content}>
              <h3>Обучение и наставничество</h3>
              <p>Учим считать математику заливов, чтобы быть всегда в плюсе.</p>
            </div>
            <Line />
          </div>
          <div className={styles.box2} ref={box2Ref}>
            <div className={styles.box2__content}>
              <h3>Мотивация от основателей</h3>
              <p>Лучшие сотрудники регулярно ездят в общее путешествие с основателями.</p>
            </div>
            <Line />
          </div>
          <div className={styles.box3} ref={box3Ref}>
            <div className={styles.box3__content}>
              <h3>Обучение и наставничество</h3>
              <p>Учим считать математику заливов, чтобы быть всегда в плюсе.</p>
            </div>
            <Line />
          </div>
          <div className={styles.friend} ref={friendRef}>
            <div>
              <h2><TitleGradient text={'Отправь продуктивного друга к нам на MARS'} /></h2>
              <p>И получи бонусы</p>
            </div>
            <a href='https://t.me/marsateam'><ButtonTwo text={'Узнать подробности у HR'} big={true} /></a>
          </div>
          <Canvas
            style={{
              width: '100%',
              height: '100vh',
            }}
            shadows
            ref={canvasRef}
          >
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[0, 1, 0.5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-1}
              shadow-camera-right={1}
              shadow-camera-top={1}
              shadow-camera-bottom={-1}
            />
            <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0.05, 0.5]} fov={50} />

            {/* <EnvironmentGLTF url="/models/environment.glb"
              scale={[2, 2, 2]}
              position={[0, -30, 0]}
            /> */}
            <Environment files="/models/outer-space-1.exr" />

            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            {/* Передача scrollProgressRef и position в Model */}
            <Model scrollProgressRef={scrollProgressRef} position={[0, -0.2, 0]} scrlProgress={isProgress} />
          </Canvas>
        </div>
      </div>
    )
  } else if (window.innerWidth < 1200) {

    return (
      <div style={{ overflow: 'hidden' }}>
        <div className={styles.team} ref={teamRef}>
          <h2>
            <TitleGradient text={'Стань частью команды'} />
          </h2>
          <p>Хочешь работать плечом к плечу с ключевыми игроками рынка? Присоединяйся к нам</p>
          <Link href='/vacancy'><ButtonTwo text={'вакансии'} /></Link>
        </div>
        <div
          className={rootClassName}
          id='mascot'
          ref={mascotRef}
          style={{ height: `${10 / speedFactor}vh`, position: 'relative' }} // Установите высоту пропорционально speedFactor
        >
          <div className={styles.box} ref={box1Ref}>
            <div className={styles.box__content}>
              <h3>Обучение и наставничество</h3>
              <p>Учим считать математику заливов, чтобы быть всегда в плюсе.</p>
            </div>
            <Line1 />
          </div>
          <div className={styles.box2} ref={box2Ref}>
            <Line2 />
            <div className={styles.box2__content}>
              <h3>Мотивация от основателей</h3>
              <p>Лучшие сотрудники регулярно ездят в общее путешествие с основателями.</p>
            </div>
          </div>
          <div className={styles.box3} ref={box3Ref}>
            <div className={styles.box3__content}>
              <h3>Обучение и наставничество</h3>
              <p>Учим считать математику заливов, чтобы быть всегда в плюсе.</p>
            </div>
            <Line1 />
          </div>
          <div className={styles.friend} ref={friendRef}>
          <div>
              <h2><TitleGradient text={'Отправь продуктивного друга к нам на MARS'} /></h2>
              <p>И получи бонусы</p>
            </div>
            <a href='https://t.me/marsateam'><ButtonTwo text={'Узнать подробности у HR'} big={true} /></a>
          </div>
          <Canvas
            style={{
              width: '100%',
              height: '100vh',
            }}
            shadows
            ref={canvasRef}
          >
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[0, 1, 0.5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-1}
              shadow-camera-right={1}
              shadow-camera-top={1}
              shadow-camera-bottom={-1}
            />
            <PerspectiveCamera ref={cameraRef} makeDefault position={[-0.1, 0, 0.5]} fov={50} />

            <EnvironmentGLTF url="/models/environment.glb"
              scale={[2, 2, 2]}
              position={[0, -30, 0]}
            />
            <Environment files="/models/outer-space-1.exr" />

            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            {/* Передача scrollProgressRef и position в Model */}
            <Model scrollProgressRef={scrollProgressRef} position={[0, -0.2, 0]} scrlProgress={isProgress} />
          </Canvas>
        </div>
      </div>
    )
  } else {
    return (
      <div style={{ overflow: 'hidden' }}>
        <div className={styles.team} ref={teamRef}>
          <h2>
            <TitleGradient text={'Стань частью команды'} />
          </h2>
          <p>Хочешь работать плечом к плечу с ключевыми игроками рынка? Присоединяйся к нам</p>
          <Link href='/vacancy'><ButtonTwo text={'вакансии'} /></Link>
        </div>
        <div
          className={rootClassName}
          id='mascot'
          ref={mascotRef}
          style={{ height: `${10 / speedFactor}vh`, position: 'relative' }} // Установите высоту пропорционально speedFactor
        >
          <div className={styles.box} ref={box1Ref}>
            <div className={styles.box__content}>
              <h3>Обучение и наставничество</h3>
              <p>Учим считать математику заливов, чтобы быть всегда в плюсе.</p>
            </div>
            <Line1 />
          </div>
          <div className={styles.box2} ref={box2Ref}>
            <Line2 />
            <div className={styles.box2__content}>
              <h3>Мотивация от основателей</h3>
              <p>Лучшие сотрудники регулярно ездят в общее путешествие с основателями.</p>
            </div>
          </div>
          <div className={styles.box3} ref={box3Ref}>
            <div className={styles.box3__content}>
              <h3>Обучение и наставничество</h3>
              <p>Учим считать математику заливов, чтобы быть всегда в плюсе.</p>
            </div>
            <Line3 />
          </div>
          <div className={styles.friend} ref={friendRef}>
            <div>
              <h2><TitleGradient text={'Отправь продуктивного друга к нам на MARS'} /></h2>
              <p>И получи бонусы</p>
            </div>
            <a href='https://t.me/marsateam'><ButtonTwo text={'Узнать подробности у HR'} big={true} /></a>
          </div>
          <Canvas
            style={{
              width: '100%',
              height: '100vh',
            }}
            shadows
            ref={canvasRef}
          >
            <directionalLight
              position={[0, 1, 0.5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-1}
              shadow-camera-right={1}
              shadow-camera-top={1}
              shadow-camera-bottom={-1}
            />
            <PerspectiveCamera ref={cameraRef} makeDefault position={[-0.1, 0, 0.5]} fov={50} />

            <Environment files={'/models/outer-space-1.exr'} environmentRotation={[0, Math.PI, 0]}/>

            {/* <OrbitControls /> */}

            <Model scrollProgressRef={scrollProgressRef} position={[0, -0.2, 0]} scrlProgress={isProgress} />
          </Canvas>
        </div>
      </div>
    )
  }

}

export default Part
