/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
// src/components/astronautAnimation/astronautAnimation.tsx
'use client'

import * as THREE from 'three'
import React, { forwardRef, useRef, useEffect, useMemo, memo   } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { RGBELoader } from 'three-stdlib'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import gsap from 'gsap'
import { ModelProps, GLTFResult } from './astronautAnimation.types'
import Stats from 'stats-js'

const AstronautModel = memo(({ scrollProgressRef, scrlProgress, ...props }: ModelProps) => {
  const group = useRef<THREE.Group>(null)

  // Доступ к сцене и рендереру
  const { scene, gl } = useThree()

  // Настройка тонмаппинга и гамма-коррекции
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1 // Сделаем немного ярче
    gl.outputColorSpace = THREE.SRGBColorSpace;
  }, [gl])

  // Загружаем модель
  const { nodes, materials, animations } = useGLTF('/models/Astronaut_Animation-transformed.glb') as GLTFResult
  const { actions: { 'Action.001': mainAction }, mixer } = useAnimations(animations, group)

  const envScene = useRef(new THREE.Scene()) // Отдельная сцена для окружения
  const envSphereRef = useRef<THREE.Mesh>()
  const cubeCameraRef = useRef<THREE.CubeCamera>()

  const textureLoader = useMemo(() => new RGBELoader(), [])
  const texture = useLoader(RGBELoader, '/models/MARSA-team-logo.hdr')

  useEffect(() => {
    const rgbeLoader = new RGBELoader()
    rgbeLoader.load('/models/MARSA-team-logo.hdr', (texture) => {
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      // Используем сферу в отдельной сцене
      texture.mapping = THREE.EquirectangularReflectionMapping
      const geometry = new THREE.SphereGeometry(100, 64, 64)
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide
      })
      const envSphere = new THREE.Mesh(geometry, material)
      envScene.current.add(envSphere)
      envSphere.position.set(0, 45, 0)
      envScene.current.add(envSphere)
      envSphereRef.current = envSphere

      // Создаем рендертаргет и кубкамеру
      const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512, {
        format: THREE.RGBAFormat,
        generateMipmaps: true
      })
      const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget)
      cubeCamera.position.set(0, 0, 0)
      scene.add(cubeCamera)
      cubeCameraRef.current = cubeCamera

      // Применяем кубмапу к шлему
      const helmetMaterials = [materials.Material]
      helmetMaterials.forEach((mat) => {
        mat.envMap = cubeRenderTarget.texture
        mat.metalness = 0.5
        mat.roughness = 0.0
        mat.envMapIntensity = 2.0
        mat.needsUpdate = true
      })

      // Обновляем кубкамеру первый раз
      cubeCamera.update(gl, envScene.current)

      if (scrlProgress) {
        // Анимируем вращение куб-камеры вместо сферы
        gsap.to(cubeCamera.rotation, {
          duration: 5,
          y: -Math.PI * 1.5,
          ease: "linear",
          onUpdate: () => {
            cubeCamera.update(gl, envScene.current)
          }
        })
      }
    })
  }, [gl, materials, scene, scrlProgress])

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const stats = new Stats()
      document.body.appendChild(stats.dom)

      return () => {
        document.body.removeChild(stats.dom)
      }
    }
  }, [])

  if (mainAction) {
    mainAction.setLoop(THREE.LoopOnce, 0).play().clampWhenFinished = true
  } else {
    console.warn('Action.001 not found')
  }

  useFrame(() => {
    if (!mainAction || !mixer) return

    const animationId = requestAnimationFrame(() => {
      const duration = mainAction.getClip().duration

      const smoothProgress = THREE.MathUtils.lerp(
        mainAction.time / duration,
        Number(scrlProgress ?? 0),
        0.1
      )

      mainAction.time = smoothProgress * duration
    })

    return () => cancelAnimationFrame(animationId)
  })

  return (
    <group ref={group} {...props} dispose={null} scale={0.02}>
      <group name="Scene">
        <group name="Armature001" rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="BOOT"
            geometry={nodes.BOOT.geometry}
            material={materials.BOOT}
            skeleton={nodes.BOOT.skeleton}
          />
          <skinnedMesh
            name="DETAILS"
            geometry={nodes.DETAILS.geometry}
            material={materials.DETAILS}
            skeleton={nodes.DETAILS.skeleton}
          />
          <group name="GEARS">
            <skinnedMesh
              name="GEARS_1"
              geometry={nodes.GEARS_1.geometry}
              material={materials.GEARS}
              skeleton={nodes.GEARS_1.skeleton}
            />
            <skinnedMesh
              name="GEARS_2"
              geometry={nodes.GEARS_2.geometry}
              material={materials['Material.001']}
              skeleton={nodes.GEARS_2.skeleton}
            />
          </group>
          <skinnedMesh
            name="GLOVES"
            geometry={nodes.GLOVES.geometry}
            material={materials.GLOVES}
            skeleton={nodes.GLOVES.skeleton}
          />
          <group name="HELMET">
            <skinnedMesh
              name="HELMET_1"
              geometry={nodes.HELMET_1.geometry}
              material={materials.HELMET}
              skeleton={nodes.HELMET_1.skeleton}
            />
            <skinnedMesh
              name="HELMET_2"
              geometry={nodes.HELMET_2.geometry}
              material={materials.HELMET}
              skeleton={nodes.HELMET_2.skeleton}
            />
            <skinnedMesh
              name="HELMET_3"
              geometry={nodes.HELMET_3.geometry}
              material={materials.Material}
              skeleton={nodes.HELMET_3.skeleton}
            />
          </group>
          <skinnedMesh
            name="PANTS"
            geometry={nodes.PANTS.geometry}
            material={materials.PANTS}
            skeleton={nodes.PANTS.skeleton}
          />
          <group name="Patch">
            <skinnedMesh
              name="mesh001"
              geometry={nodes.mesh001.geometry}
              material={materials['Material.005']}
              skeleton={nodes.mesh001.skeleton}
            />
            <skinnedMesh
              name="mesh001_1"
              geometry={nodes.mesh001_1.geometry}
              material={materials['Fabric Pattern 06']}
              skeleton={nodes.mesh001_1.skeleton}
            />
          </group>
          <skinnedMesh
            name="TORSO"
            geometry={nodes.TORSO.geometry}
            material={materials.TORSO}
            skeleton={nodes.TORSO.skeleton}
          />
        </group>
      </group>
    </group>
  )
})

useGLTF.preload('/models/Astronaut_Animation-transformed.glb')

export default AstronautModel
