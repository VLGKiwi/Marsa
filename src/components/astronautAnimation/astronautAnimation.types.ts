import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import { GroupProps } from '@react-three/fiber'

// Базовые пропсы компонента
export interface AstronautAnimationProps {
  className?: string
  scrollProgressRef?: React.MutableRefObject<number>
  scrlProgress?: boolean
}

// Тип для имени анимации
export type ActionName = 'Action.001'

// Расширение THREE.AnimationClip для дополнительной типизации
export interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

// Определение типа GLTFResult
export type GLTFResult = GLTF & {
  nodes: {
    BOOT: THREE.SkinnedMesh
    DETAILS: THREE.SkinnedMesh
    GEARS_1: THREE.SkinnedMesh
    GEARS_2: THREE.SkinnedMesh
    GLOVES: THREE.SkinnedMesh
    HELMET_1: THREE.SkinnedMesh
    HELMET_2: THREE.SkinnedMesh
    HELMET_3: THREE.SkinnedMesh
    PANTS: THREE.SkinnedMesh
  }
}

export interface ModelProps extends GroupProps {
  scrollProgressRef: React.MutableRefObject<number>
  scrlProgress?: boolean
}
