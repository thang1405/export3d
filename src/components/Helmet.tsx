import React from "react"

const Helmet = () => {
  const helmet = (
    <mesh position={[0, 3, 0]} castShadow>
      <boxGeometry attach="geometry" args={[0.75, 0.75, 0.75]} />
      <meshPhongMaterial attach="material" color="#675C5E" />
    </mesh>
  )

  const hornLeftBottom = (
    <mesh castShadow position={[-0.75, 3.1, 0]}>
      <boxGeometry attach="geometry" args={[1.5, 0.5, 0.5]} />
      <meshPhongMaterial attach="material" color="#F4CCA1" flatShading={false} />
    </mesh>
  )
  const hornLeftTop = (
    <mesh position={[-1.3, 3.6, 0]} rotation={[0, 0, Math.PI / 2 + 0.25]}>
      <boxGeometry attach="geometry" args={[1.1, 0.25, 0.25]} />
      <meshPhongMaterial attach="material" color="#F4CCA1" flatShading={false} />
    </mesh>
  )

  return (
    <>
      {helmet}
      {hornLeftBottom}
      {hornLeftTop}
    </>
  )
}

export default Helmet
