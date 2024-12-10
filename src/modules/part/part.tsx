/* eslint-disable no-dupe-else-if */
// src/components/Part.tsx
'use client'

import React, { FC, useRef, useEffect } from 'react'
import classNames from 'classnames'

import styles from './part.module.scss'
import { PartProps } from './part.types'

import { Canvas } from '@react-three/fiber'
import Model from '@/components/astronautAnimation/astronautAnimation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import EnvironmentGLTF from '@/components/environmentGltf/environmentGltf'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import { TitleGradient } from '@/ui'

gsap.registerPlugin(ScrollTrigger)

const Part: FC<PartProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)
  const mascotRef = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef<number>(0)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const hasCameraMoved = useRef(false)
  const friendRef = useRef(null)

  // Определите коэффициент скорости
  const speedFactor = 0.1 // Меняйте значение для регулировки скорости (0.5 = вдвое медленнее)

  useEffect(() => {
    const mascot = mascotRef.current
    if (!mascot) {
      console.warn('mascotRef is null')
      return
    }

    function camMove(self: globalThis.ScrollTrigger) {
      scrollProgressRef.current = self.progress
      console.log('Scroll progress:', self.progress) // Для отладки

      if (self.progress >= 1) {
        gsap.to(friendRef.current, {
          opacity: 1,
          duration: 1,
        })
      } else if (self.progress < 1) {
        gsap.to(friendRef.current, {
          opacity: 0,
          duration: 1,
        })
      }

      if (self.progress >= 0.7 && !hasCameraMoved.current) {
        hasCameraMoved.current = true
        if (cameraRef.current) {
          // Анимация камеры с помощью gsap
          gsap.to(cameraRef.current.position, {
            x: 0, // Установите нужные значения для приближения
            y: 0.15,
            z: 0.35, // Приближение к космонавту
            duration: 1,
            ease: 'power2.inOut',
            onComplete: function () { hasCameraMoved.current = false }
          })

          gsap.to(mascotRef.current, {

          })
        }
      } else if (self.progress < 0.3 && !hasCameraMoved.current) {
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
      } else if ((self.progress >= 0.3 && !hasCameraMoved.current) || (self.progress <= 0.7 && !hasCameraMoved.current)) {
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
      markers: true, // Установите true для отладки, false для продакшена
      onUpdate: (self) => {
        camMove(self)
      },
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [speedFactor])

  return (
    <div
      className={rootClassName}
      id='mascot'
      ref={mascotRef}
      style={{ height: `${10 / speedFactor}vh`, position: 'relative' }} // Установите высоту пропорционально speedFactor
    >
      <div className={styles.friend} ref={friendRef}>
        <h2><TitleGradient text={'Отправь продуктивного друга к нам на MARS'} /></h2>
        <p>И получи бонусы</p>
        <button>Узнать подробности у HR</button>
      </div>
      <Canvas
        style={{
          width: '100%',
          height: '100vh',
        }}
        shadows

      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <PerspectiveCamera ref={cameraRef} makeDefault position={[-0.1, 0, 0.5]} fov={50} />

        {/* <EnvironmentGLTF url="/models/environment.glb"
          scale={[2, 2, 2]}
          position={[0, -30, 0]}
        /> */}
        <Environment files="/models/outer-space-1.exr" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Передача scrollProgressRef и position в Model */}
        <Model scrollProgressRef={scrollProgressRef} position={[0, -0.2, 0]} />
      </Canvas>
    </div>
  )
}

export default Part
