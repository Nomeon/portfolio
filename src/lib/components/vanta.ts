// @ts-nocheck
import VantaBase, {VANTA} from './vantaBase'
import {rn, ri, mobileCheck, getBrightness} from './helpers'

const win = typeof window == 'object'
let THREE = win && window.THREE

class Effect extends VantaBase {
  static initClass() {
    this.prototype.defaultOptions = {
      color: 0x00c8ff,
      backgroundColor: 0x0,
      points: 8,
      maxDistance: 22,
      spacing: 16,
      showDots: false
    }
  }

  constructor(userOptions) {
    THREE = userOptions.THREE || THREE
    super(userOptions)
  }

  genPoint(x, y, z) {
    let sphere
    if (!this.points) { this.points = [] }
    if (this.options.showDots) {
        const geometry = new THREE.SphereGeometry( 0.25, 12, 12 )
        const material = new THREE.MeshLambertMaterial({color: this.options.color})
        sphere = new THREE.Mesh( geometry, material )
    } else {
      sphere = new THREE.Object3D()
    }
    this.cont.add( sphere )
    sphere.ox = x
    sphere.oy = y
    sphere.oz = z
    sphere.position.set(x,y,z)
    sphere.r = rn(-2,2)
    return this.points.push(sphere)
  }

  onInit() {
    this.cont = new THREE.Group()
    this.cont.position.set(0,0,0)
    this.scene.add(this.cont)

    let n = this.options.points
    let { spacing } = this.options
    if (mobileCheck()) {
      n = ~~(n * 0.75)
      spacing = ~~(spacing * 0.65)
    }

    const numPoints = n * n * 2
    this.linePositions = new Float32Array( numPoints * numPoints * 3 )
    this.lineColors = new Float32Array( numPoints * numPoints * 3 )

    const colorB = getBrightness(new THREE.Color(this.options.color))
    const bgB = getBrightness(new THREE.Color(this.options.backgroundColor))
    this.blending =  colorB > bgB ? 'additive' : 'subtractive'

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(this.linePositions, 3).setUsage(THREE.DynamicDrawUsage))
    geometry.setAttribute('color', new THREE.BufferAttribute(this.lineColors, 3).setUsage(THREE.DynamicDrawUsage))
    geometry.computeBoundingSphere()
    geometry.setDrawRange( 0, 0 )
    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: this.blending === 'additive' ? THREE.AdditiveBlending : null,
      transparent: true
    })

    this.linesMesh = new THREE.LineSegments( geometry, material )
    this.cont.add( this.linesMesh )

    for (let i = 0; i<=n; i++) {
      for (let j = 0; j<=n; j++) {
        const y = ri(-3, 3)
        const x = ((i - (n/2)) * spacing) + ri(-5,5)
        let z = ((j - (n/2)) * spacing) + ri(-5,5)
        if (i % 2) { z += spacing * 0.5 } // offset
        this.genPoint(x, y - ri(5, 15), z)
        this.genPoint(x + ri(-5,5), y + ri(5, 15), z + ri(-5,5))
      }
    }

    this.camera = new THREE.PerspectiveCamera(
      25,
      this.width / this.height,
      0.01, 10000)
    this.camera.position.set(50, 100, 150)
    this.scene.add( this.camera )

    const ambience = new THREE.AmbientLight(0xffffff, 0.75)
    this.scene.add(ambience)

    this.spot = new THREE.SpotLight(0xFFFFFF, 1)
    this.spot.position.set(0, 200, 0)
    this.spot.distance = 400
    this.spot.target = this.cont
    return this.scene.add(this.spot)
  }

  onDestroy() {
    if (this.scene) this.scene.remove(this.linesMesh)
    this.spot = this.points = this.linesMesh = this.lineColors = this.linePositions = null
  }

  setOptions(userOptions) { // allow setOptions to change point colors
    super.setOptions(userOptions)
    if (userOptions.color) {
      this.points.forEach(p => {
        p.material.color = new THREE.Color(userOptions.color)
      })
    }
  }

  onUpdate() {
    let diff, t
    const c = this.camera
    if (Math.abs(c.tx - c.position.x) > 0.01) {
      diff = c.tx - c.position.x
      c.position.x += diff * 0.02
    }
    if (Math.abs(c.ty - c.position.y) > 0.01) {
      diff = c.ty - c.position.y
      c.position.y += diff * 0.02
    }
    c.lookAt( new THREE.Vector3( 0, 0, 0 ) )
    // c.near = 0.01
    // c.updateProjectionMatrix()

    let vertexpos = 0
    let colorpos = 0
    let numConnected = 0

    const bgColor = new THREE.Color(this.options.backgroundColor)
    const color = new THREE.Color(this.options.color)
    const diffColor = color.clone().sub(bgColor)

    if (this.rayCaster) {
      this.rayCaster.setFromCamera(new THREE.Vector2(this.rcMouseX,this.rcMouseY), this.camera);
    }

    for (let i = 0; i < this.points.length; i++) {
      let dist, distToMouse
      const p = this.points[i]
      // p.position.y += Math.sin(@t * 0.005 - 0.02 * p.ox + 0.015 * p.oz) * 0.02

      if (this.rayCaster) {
        distToMouse = this.rayCaster.ray.distanceToPoint(p.position)
      } else {
        distToMouse = 1000
      }
      const distClamp = distToMouse.clamp(5,15)
      p.scale.x = (p.scale.y = (p.scale.z = ((15 - distClamp) * 0.25).clamp(1, 100)))

      if (p.r !== 0) {
        let ang = Math.atan2( p.position.z, p.position.x )
        dist = Math.sqrt( (p.position.z * p.position.z) + (p.position.x * p.position.x) )
        ang += 0.00025 * p.r
        p.position.x = dist * Math.cos(ang)
        p.position.z = dist * Math.sin(ang)
      }

      for (let j = i; j < this.points.length; j++) {
        const p2 = this.points[j]
        const dx = p.position.x - p2.position.x
        const dy = p.position.y - p2.position.y
        const dz = p.position.z - p2.position.z
        dist = Math.sqrt( (dx * dx) + (dy * dy) + (dz * dz) )
        if (dist < this.options.maxDistance) {
          let lineColor
          const alpha = (( 1.0 - (dist / this.options.maxDistance) ) * 2).clamp(0, 1)
          if (this.blending === 'additive') {
            lineColor = new THREE.Color(0x000000).lerp(diffColor, alpha)
          } else {
            lineColor = bgColor.clone().lerp(color, alpha)
          }

          this.linePositions[ vertexpos++ ] = p.position.x
          this.linePositions[ vertexpos++ ] = p.position.y
          this.linePositions[ vertexpos++ ] = p.position.z
          this.linePositions[ vertexpos++ ] = p2.position.x
          this.linePositions[ vertexpos++ ] = p2.position.y
          this.linePositions[ vertexpos++ ] = p2.position.z

          this.lineColors[ colorpos++ ] = lineColor.r
          this.lineColors[ colorpos++ ] = lineColor.g
          this.lineColors[ colorpos++ ] = lineColor.b
          this.lineColors[ colorpos++ ] = lineColor.r
          this.lineColors[ colorpos++ ] = lineColor.g
          this.lineColors[ colorpos++ ] = lineColor.b

          numConnected++
        }
      }
    }
    this.linesMesh.geometry.setDrawRange( 0, numConnected * 2 )
    this.linesMesh.geometry.attributes.position.needsUpdate = true
    this.linesMesh.geometry.attributes.color.needsUpdate = true

    return this.t * 0.001
  }

  onMouseMove(x,y) {
    const c = this.camera
    if (!c.oy) {
      c.oy = c.position.y
      c.ox = c.position.x
      c.oz = c.position.z
    }
    const ang = Math.atan2(c.oz, c.ox)
    const dist = Math.sqrt((c.oz*c.oz) + (c.ox*c.ox))
    const tAng = ang + ((x-0.5) * 2 * (this.options.mouseCoeffX || 1))
    c.tz = dist * Math.sin(tAng)
    c.tx = dist * Math.cos(tAng)
    c.ty = c.oy + ((y-0.5) * 50 * (this.options.mouseCoeffY || 1))

    this.rcMouseX = (x * 2) - 1
    this.rcMouseY = (- x * 2) + 1
  }

  onRestart() {
    if (this.scene) this.scene.remove(this.linesMesh)
    this.points = []
  }
}
Effect.initClass()
export default VANTA.register('NET', Effect)