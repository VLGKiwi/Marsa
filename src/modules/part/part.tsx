'use client'
import { FC } from 'react'
import classNames from 'classnames'

import styles from './part.module.scss'
import { PartProps } from './part.types'

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Model from '@/components/astronautAnimation/astronautAnimation'

const Part: FC<PartProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName} id='mascot' style={{ height: '200vh', position: 'relative' }}>
      <Canvas
        style={{ width: '100%', height: '100vh', backgroundColor: 'black', position: 'fixed' }}
        camera={{ position: [0, 0, 0.5], far: 50, fov: 50 }}
      >
        <axesHelper />
        {/* Добавляем окружение для реалистичных отражений */}
        <Environment preset="sunset" background />

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
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Model position={[0.2, -0.2, 0]} />
      </Canvas>
    </div>
  )
}

export default Part
