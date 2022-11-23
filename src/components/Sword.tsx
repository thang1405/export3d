/* eslint-disable react/no-unknown-property */
import * as THREE from "three"

const shape = new THREE.Shape()
const extrudeSettings = {
  steps: 2,
  depth: 0.05,
  bevelEnabled: true,
  bevelThickness: 0.25,
  bevelSize: 0.5,
  bevelOffset: 0,
  bevelSegments: 1,
}

shape.moveTo(0, 0.1)
shape.lineTo(4, 0.5)
shape.lineTo(4.5, 0)
shape.lineTo(4, -0.5)
shape.lineTo(0, -0.1)

function Sword() {
  const handle1 = (
    <mesh castShadow position={[-0.85, 0.0, 0]}>
      <boxGeometry attach="geometry" args={[1.5, 0.25, 0.25]} />
      <meshPhongMaterial attach="material" color="#7D5A3F" />
    </mesh>
  )
  const handle2 = (
    <mesh castShadow>
      <boxGeometry attach="geometry" args={[0.25, 2, 0.25]} />
      <meshPhongMaterial attach="material" color="#7D5A3F" />
    </mesh>
  )

  const bladeGeo = <extrudeBufferGeometry attach="geometry" args={[shape, extrudeSettings]} />
  const blade = (
    <mesh castShadow position={[0.5, 0, 0]}>
      {bladeGeo}
      <meshPhongMaterial attach="material" color="#675C5E" />
    </mesh>
  )

  return (
    <group position={[-0.5, 0, -0.05]}>
      {blade}
      {handle1}
      {handle2}
    </group>
  )
}

export default Sword
