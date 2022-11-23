import React, { Suspense, useRef, useState, useEffect, forwardRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useSnapshot } from "valtio"
import DownloadButton from "./components/DownloadButton"
import GLTFExporter from "three-gltf-exporter"
import { configModel } from "./model"
import Axe from "./components/Axe"
import Sword from "./components/Sword"
import PegLeg from "./components/PegLeg"
import Helmet from "./components/Helmet"

// import { GLTFExporter } from "https://cdn.skypack.dev/three/examples/jsm/exporters/GLTFExporter.js"

// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
const state = proxy({
  current: null,
  items: {
    laces: "#ffffff",
    mesh: "#ffffff",
    caps: "#ffffff",
    inner: "#ffffff",
    sole: "#ffffff",
    stripes: "#ffffff",
    band: "#ffffff",
    patch: "#ffffff",
  },
})

const Shoe = forwardRef((props, ref) => {
  const snap = useSnapshot(state)
  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const { nodes, materials } = useGLTF("shoe-draco.glb")

  // Animate model

  // Cursor showing current color
  const [hovered, set] = useState(null)
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
      return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`)
    }
  }, [hovered])

  const war = (
    <>
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry attach="geometry" args={[1.5, 1.5, 1.2]} />
        <meshPhongMaterial attach="material" color="#F4CCA1" flatShading={false} />
      </mesh>
      <mesh castShadow rotation={[130, 0, 0]} position={[0, 2.43, 0.46]}>
        <boxGeometry attach="geometry" args={[1.5, 0.5, 0.5]} />
        <meshPhongMaterial attach="material" color="#F4CCA1" flatShading={false} />
      </mesh>
      <mesh position={[0, 2.05, 0.54]}>
        <boxGeometry attach="geometry" args={[0.35, 0.5, 0.5]} />
        <meshPhongMaterial attach="material" color="#F4CCA1" flatShading={false} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-2, 0, 0.2]} rotation={[0, Math.PI / 4, Math.PI / 4]} castShadow>
        <boxGeometry attach="geometry" args={[2.5, 1, 1]} />
        <meshPhongMaterial attach="material" color="#F4CCA1" flatShading={false} />
      </mesh>
      <mesh castShadow rotation={[Math.PI / 8, 0, -Math.PI / 2 - 0.3]} position={[-2.4, 0, 1.2]}>
        <boxGeometry attach="geometry" args={[2.5, 1.25, 1.25]} />
        <meshPhongMaterial attach="material" color="#F4CCA1" flatShading={false} />
      </mesh>
      {/* Right arm */}
      <mesh position={[2, 0, -0.25]} rotation={[0, -Math.PI / 8, -Math.PI / 4]} castShadow>
        <boxGeometry attach="geometry" args={[2.5, 1, 1]} />
        <meshPhongMaterial attach="material" color="#F4CCA1" flatShading={false} />
      </mesh>
      <mesh castShadow rotation={[-Math.PI / 8, 0, Math.PI / 2 - 0.3]} position={[2.4, -1.5, 0.42]}>
        <boxGeometry attach="geometry" args={[2.5, 1.25, 1.25]} />
        <meshPhongMaterial attach="material" color="#F4CCA1" flatShading={false} />
      </mesh>
      {/* Weapon */}

      {/* <LegRight /> * */}
      <>
        <mesh position={[0, -2.75, -0.4]} castShadow>
          <boxGeometry attach="geometry" args={[3.25, 0.6, 1.8]} />
          <meshPhongMaterial attach="material" color="#553B26" />
        </mesh>
        <mesh castShadow position={[-0.75, -3.5, -0.35]}>
          <boxGeometry attach="geometry" args={[1.25, 1, 1.4]} />
          <meshPhongMaterial attach="material" color="#553B26" />
        </mesh>
        <mesh position={[-0.75, -4.4, -0.35]}>
          <boxGeometry attach="geometry" args={[1, 0.8, 1]} />
          <meshPhongMaterial attach="material" color="#2B1E15" />
        </mesh>
        <mesh position={[-0.75, -4.58, 0.1]}>
          <boxGeometry attach="geometry" args={[1, 0.45, 1]} />
          <meshPhongMaterial attach="material" color="#2B1E15" />
        </mesh>
        {/* // right */}
        <mesh position={[0.75, -3.5, -0.35]} castShadow>
          <boxGeometry attach="geometry" args={[1.25, 1, 1.4]} />
          <meshPhongMaterial attach="material" color="#553B26" />
        </mesh>
        <mesh castShadow position={[0.75, -4.4, -0.35]}>
          <boxGeometry attach="geometry" args={[1, 0.8, 1]} />
          <meshPhongMaterial attach="material" color="#2B1E15" />
        </mesh>
        <mesh position={[0.75, -4.58, 0.1]}>
          <boxGeometry attach="geometry" args={[1, 0.45, 1]} />
          <meshPhongMaterial attach="material" color="#2B1E15" />
        </mesh>
      </>
      {/* <Body /> */}
      <>
        <mesh position={[0, 0.75, -1.25]} castShadow>
          <extrudeBufferGeometry attach="geometry" args={[configModel.body.shapeBody1, configModel.body.extrudeBodySettings]} />
          <meshPhongMaterial attach="material" color="#F4CCA1" flatShading={false} />
        </mesh>
        <mesh castShadow rotation={[-Math.PI / 24, 0, 0]} position={[0, 0.525, -1.155]}>
          <extrudeBufferGeometry attach="geometry" args={[configModel.body.shapeBody2, configModel.body.extrudeBodySettings]} />
          <meshPhongMaterial attach="material" color="#F4CCA1" flatShading={false} />
        </mesh>
        <mesh position={[0, -2.5, -0.4]}>
          <boxGeometry attach="geometry" args={[3.5, 0.5, 2.1]} />
          <meshPhongMaterial attach="material" color="#675C5E" />
        </mesh>
      </>
      {/* beard */}
      <>
        <mesh position={[0.5, 1.5, 1.65]} rotation={[0, -Math.PI / 2, 0]}>
          <extrudeBufferGeometry attach="geometry" args={[configModel.beard.shapeBread1, configModel.beard.primaryBeardSettings]} />
          <meshPhongMaterial attach="material" color="#DA6540" flatShading />
        </mesh>
        <mesh position={[1.1, 1.4, 1.3]} rotation={[0, -Math.PI / 2 + 0.25, 0]}>
          {" "}
          <extrudeBufferGeometry attach="geometry" args={[configModel.beard.shapeBread2, configModel.beard.secondaryBeardSettings]} />
          <meshPhongMaterial attach="material" color="#DA6540" flatShading />
        </mesh>
        <mesh position={[-0.18, 1.4, 1.55]} rotation={[0, -Math.PI / 2 - 0.25, 0]}>
          {" "}
          <extrudeBufferGeometry attach="geometry" args={[configModel.beard.shapeBread2, configModel.beard.secondaryBeardSettings]} />
          <meshPhongMaterial attach="material" color="#DA6540" flatShading />
        </mesh>
      </>
      {/* <Mustache /> */}

      <mesh position={[1, -3.75, -0.35]} castShadow>
        <boxGeometry attach="geometry" args={[0.5, 1.8, 0.5]} />
        <meshPhongMaterial attach="material" color="#7D5A3F" />
      </mesh>
      <mesh castShadow position={[1, -3.1, -0.35]}>
        <boxGeometry attach="geometry" args={[1, 0.75, 1]} />
        <meshPhongMaterial attach="material" color="#7D5A3F" />
      </mesh>
      <mesh position={[1, -4.65, -0.34]}>
        <boxGeometry attach="geometry" args={[0.6, 0.2, 0.6]} />
        <meshPhongMaterial color="#716668" />
      </mesh>
    </>
  )

  // Using the GLTFJSX output here to wire in app-state and hook up events
  return (
    <group
      ref={ref}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onClick={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}
      scale={0.1}>
      {/* <Axe /> */}
      {/* <Sword /> */}
      {/* <PegLeg /> */}
      {/* <Helmet /> */}
      {/* {war} */}
      <mesh position={[0, -2.5, -0.4]}>
        <boxGeometry attach="geometry" args={[3.5, 0.5, 2.1]} />
        <meshPhongMaterial attach="material" color="#ff9800" />
      </mesh>
      {/* Shoe */}
      {/* <mesh position={[-0.75, -4.58, 0.1]}>
        <boxGeometry attach="geometry" args={[1, 0.45, 1]} />
        <meshPhongMaterial attach="material" color="#2B1E15" />
      </mesh>
      <mesh position={[-0.75, -4.4, -0.35]}>
        <boxGeometry attach="geometry" args={[1, 0.8, 1]} />
        <meshPhongMaterial attach="material" color="#2B1E15" />
      </mesh>

      <mesh position={[0.75, -4.58, 0.1]}>
        <boxGeometry attach="geometry" args={[1, 0.45, 1]} />
         <meshPhongMaterial attach="material" color="#2B1E15" />
      </mesh>
      <mesh castShadow position={[0.75, -4.4, -0.35]}>
        <boxGeometry attach="geometry" args={[1, 0.8, 1]} />
         <meshPhongMaterial attach="material" color="#2B1E15" />
      </mesh> */}
    </group>
  )
})

function Picker() {
  const snap = useSnapshot(state)
  return (
    <div style={{ display: snap.current ? "block" : "none" }}>
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <h1>{snap.current}</h1>
    </div>
  )
}

export default function App() {
  const shoeRef = useRef()
  const link = useRef()

  function downloadGlb() {
    download(shoeRef.current)
  }

  function download(scene) {
    const exporter = new GLTFExporter()
    exporter.parse(
      scene,
      function (result) {
        saveArrayBuffer(result, "MyFancyShoe.glb")
      },
      {
        binary: true,
      },
    )
  }

  function saveArrayBuffer(buffer, fileName) {
    // console.log(...buffer)
    save(new Blob([buffer], { type: "application/octet-stream" }), fileName)
  }

  const mouseClickEvents = ["mousedown", "click", "mouseup"]
  function simulateMouseClick(element) {
    mouseClickEvents.forEach((mouseEventType) =>
      element.dispatchEvent(
        new MouseEvent(mouseEventType, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        }),
      ),
    )
  }

  function save(blob, filename) {
    // THIS IS WHERE WE WOULD CALL S3 UPLOAD
    link.current.href = URL.createObjectURL(blob)
    link.current.download = filename
    simulateMouseClick(link.current)
  }

  return (
    <>
      <DownloadButton handleClick={downloadGlb} />
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Suspense fallback={null}>
          <Shoe ref={shoeRef} />
          <Environment preset="city" />
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={1.5} far={0.8} />
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
      </Canvas>
      <Picker />
      <a ref={link} href="/" id="download-link">
        download
      </a>
    </>
  )
}
