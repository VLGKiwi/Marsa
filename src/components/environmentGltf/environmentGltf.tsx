// src/components/EnvironmentGLTF.tsx
'use client'

import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import * as THREE from 'three'

interface EnvironmentGLTFProps extends GroupProps {
  url: string
  scale?: [number, number, number]
  position?: [number, number, number]
  rotation?: [number, number, number]
}

const EnvironmentGLTF: React.FC<EnvironmentGLTFProps> = ({
  url,
  scale = [1, 1, 1],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  ...props
}) => {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF(url)

  useEffect(() => {
    if (group.current) {
      group.current.add(scene.clone())
      console.log('Окружение загружено и добавлено в сцену')
    }
  }, [scene])

  return (
    <group ref={group} scale={scale} position={position} rotation={rotation} {...props}>
      {/* GLB-модель уже добавлена через useEffect */}
    </group>
  )
}

useGLTF.preload('/models/environment.glb') // Предзагрузка модели для оптимизации

export default EnvironmentGLTF
