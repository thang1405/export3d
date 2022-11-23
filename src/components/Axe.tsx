/* eslint-disable react/no-unknown-property */

import * as THREE from "three"

const extrudeSettings = {
  steps: 2,
  depth: 0.05,
  bevelEnabled: true,
  bevelThickness: 0.25,
  bevelSize: 0.5,
  bevelOffset: 0,
  bevelSegments: 1,
}

const axeShape = new THREE.Shape()
axeShape.moveTo(0, 0.15)
axeShape.lineTo(1, 1)
axeShape.lineTo(1.25, 0.5)
axeShape.lineTo(1.25, -0.5)
axeShape.lineTo(1, -1)
axeShape.lineTo(0, -0.15)

const Axe = () => {
  const axeGeo = <extrudeBufferGeometry attach="geometry" args={[axeShape, extrudeSettings]} />

  const buttGeo = <boxGeometry attach="geometry" args={[0.3, 0.3, 0.3]} />
  const handle = (
    <mesh castShadow>
      <boxGeometry attach="geometry" args={[7, 0.25, 0.25]} />
      <meshPhongMaterial attach="material" color="#553B26" />
    </mesh>
  )
  const butt1 = (
    <mesh>
      {buttGeo}
      <meshPhongMaterial attach="material" color="#675C5E" />
    </mesh>
  )
  const butt2 = (
    <mesh position={[-3.5, 0, 0]}>
      {buttGeo}
      <meshPhongMaterial attach="material" color="#675C5E" />
    </mesh>
  )
  const butt3 = (
    <mesh position={[3.5, 0, 0]}>
      {buttGeo}
      <meshPhongMaterial attach="material" color="#675C5E" />
    </mesh>
  )
  const axe1 = (
    <mesh position={[2.75, 0.4, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
      {axeGeo}
      <meshPhongMaterial attach="material" color="#675C5E" />
    </mesh>
  )
  const axe2 = (
    <mesh castShadow position={[2.75, -0.4, 0]} rotation={[0, 0, -Math.PI / 2]}>
      {axeGeo}
      <meshPhongMaterial attach="material" color="#675C5E" />
    </mesh>
  )

  return (
    <group>
      {handle}
      {butt1}
      {butt2}
      {butt3}
      {axe1}
      {axe2}
    </group>
  )
}

export default Axe
