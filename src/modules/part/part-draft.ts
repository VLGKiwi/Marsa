// import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'

// const RotatingEnvironment = ({ targetRotation }: { targetRotation: [number, number, number] }) => {
//   const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);

//   // Плавное обновление вращения
//   useFrame(() => {
//     setRotation((prevRotation) => {
//       const lerp = (start: number, end: number, alpha: number) => start + (end - start) * alpha;
//       const smoothFactor = 0.01; // Уменьшенное значение для большей плавности
//       return [
//         lerp(prevRotation[0], targetRotation[0], smoothFactor),
//         lerp(prevRotation[1], targetRotation[1], smoothFactor),
//         lerp(prevRotation[2], targetRotation[2], smoothFactor),
//       ];
//     });
//   });

//   return <Environment files="/models/MARSA-team-logo.hdr" environmentRotation={rotation} />;
// };
