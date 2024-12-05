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
import { Environment } from '@react-three/drei'

gsap.registerPlugin(ScrollTrigger)

const Part: FC<PartProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)
  const mascotRef = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef<number>(0)

  // Определите коэффициент скорости
  const speedFactor = 0.1 // Меняйте значение для регулировки скорости (0.5 = вдвое медленнее)

  useEffect(() => {
    const mascot = mascotRef.current
    if (!mascot) {
      console.warn('mascotRef is null')
      return
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
        scrollProgressRef.current = self.progress
        console.log('Scroll progress:', self.progress) // Для отладки
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
      style={{ height: `${100 / speedFactor}vh`, position: 'relative' }} // Установите высоту пропорционально speedFactor
    >
      <Canvas
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: 'black',
        }}
        camera={{ position: [0, 0, 0.5], far: 50, fov: 50 }}
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
        {/* <Environment files={'./outer-space.exr'}/> */}
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Передача scrollProgressRef и position в Model */}
        <Model scrollProgressRef={scrollProgressRef} position={[0.2, -0.2, 0]} />
      </Canvas>
    </div>
  )
}

export default Part
