import * as THREE from "three"

const shapeBody1 = new THREE.Shape()
const shapeBody2 = new THREE.Shape()

shapeBody1.moveTo(-2, -0.5)
shapeBody1.lineTo(-1.5, -3.5)
shapeBody1.lineTo(1.5, -3.5)
shapeBody1.lineTo(2, -0.5)
shapeBody1.lineTo(2, 0)
shapeBody1.lineTo(2, 0.5)
shapeBody1.lineTo(-2, 0.5)
shapeBody1.lineTo(-2, 0)

shapeBody2.moveTo(-1.95, -0.5)
shapeBody2.lineTo(-1.5, -1.25)
shapeBody2.lineTo(1.5, -1.25)
shapeBody2.lineTo(1.9, -0.5)
shapeBody2.lineTo(1.95, 0)
shapeBody2.lineTo(1.95, 0.5)
shapeBody2.lineTo(-1.95, 0.5)
shapeBody2.lineTo(-1.95, 0)

const extrudeBodySettings = {
  steps: 2,
  depth: 1.75,
  bevelEnabled: false,
}

export const body = {
  shapeBody1,
  shapeBody2,
  extrudeBodySettings,
}

const primaryBeardSettings = {
  steps: 2,
  depth: 1,
  bevelEnabled: false,
}

const secondaryBeardSettings = {
  steps: 2,
  depth: 1,
  bevelEnabled: false,
}

const shapeBread1 = new THREE.Shape()
const shapeBread2 = new THREE.Shape()

shapeBread1.moveTo(-0.75, 0)
shapeBread1.bezierCurveTo(-0.75, -0.75, -0.5, -1, -0.15, -1.5)
shapeBread1.lineTo(-2, -1.5)
shapeBread1.lineTo(-2, 0)

shapeBread2.moveTo(-0.75, 0)
shapeBread2.bezierCurveTo(-0.75, -0.75, -0.5, -1, -0.25, -1.25)
shapeBread2.lineTo(-2, -1.25)
shapeBread2.lineTo(-2, 0)

export const configModel = {
  body: {
    shapeBody1,
    shapeBody2,
    extrudeBodySettings,
  },
  beard: {
    primaryBeardSettings,
    secondaryBeardSettings,
    shapeBread1,
    shapeBread2,
  },
}
