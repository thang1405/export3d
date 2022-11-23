import React from "react"

const PegLeg = () => {
  const leg = (
    <mesh position={[1, -3.75, -0.35]} castShadow>
      <boxGeometry attach="geometry" args={[0.5, 1.8, 0.5]} />
      <meshPhongMaterial attach="material" color="#7D5A3F" />
    </mesh>
  )

  const stumpUpper = (
    <mesh castShadow position={[1, -3.1, -0.35]}>
      <boxGeometry attach="geometry" args={[1, 0.75, 1]} />
      <meshPhongMaterial attach="material" color="#7D5A3F" />
    </mesh>
  )
  const stump = (
    <mesh position={[1, -4.65, -0.34]}>
      <boxGeometry attach="geometry" args={[0.6, 0.2, 0.6]} />
      <meshPhongMaterial color="#716668" />
    </mesh>
  )

  return (
    <group>
      {stump}
      {leg}
      {stumpUpper}
    </group>
  )
}

export default PegLeg
