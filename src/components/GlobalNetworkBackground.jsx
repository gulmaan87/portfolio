import { useEffect, useRef } from 'react'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  FogExp2,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector3,
  WebGLRenderer,
} from 'three'

// Reduced counts for better performance while keeping visual density
const NODE_COUNT = 20 
const PARTICLE_COUNT = 80
const BOUNDS = 190
const CONNECTION_DISTANCE = 78

function createNodeMaterial(color, opacity) {
  return new MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
  })
}

function createGlowTexture() {
  const size = 64 // Smaller texture size
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) return null
  const gradient = context.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.5, 'rgba(0, 234, 255, 0.4)')
  gradient.addColorStop(1, 'rgba(0,0,0,0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)
  return new CanvasTexture(canvas)
}

export default function GlobalNetworkBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return undefined

    const mount = mountRef.current
    const scene = new Scene()
    scene.fog = new FogExp2(0x040714, 0.0034)
    const camera = new PerspectiveCamera(58, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 175

    const renderer = new WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" })
    renderer.setPixelRatio(1) // Force 1x pixel ratio for performance
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const networkGroup = new Group()
    scene.add(networkGroup)
    const glowTexture = createGlowTexture()

    const nodes = Array.from({ length: NODE_COUNT }, (_, index) => {
      const tone = [0x00eaff, 0x5cd6ff, 0x8f7cff][index % 3]
      const mesh = new Mesh(new SphereGeometry(1.2, 8, 8), createNodeMaterial(tone, 0.7))
      mesh.position.set((Math.random() - 0.5) * BOUNDS, (Math.random() - 0.5) * BOUNDS, (Math.random() - 0.5) * BOUNDS)
      networkGroup.add(mesh)
      return { mesh, base: mesh.position.clone(), seed: index * 0.29 }
    })

    const connections = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].base.distanceTo(nodes[j].base) < CONNECTION_DISTANCE) connections.push([i, j])
      }
    }

    const linePositions = new Float32Array(connections.length * 6)
    const lineGeometry = new BufferGeometry()
    lineGeometry.setAttribute('position', new BufferAttribute(linePositions, 3))
    const lineMaterial = new LineBasicMaterial({ color: 0x00eaff, transparent: true, opacity: 0.08 })
    const lines = new LineSegments(lineGeometry, lineMaterial)
    networkGroup.add(lines)

    const particleGeometry = new BufferGeometry()
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * BOUNDS * 1.5
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS * 1.2
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS
    }
    particleGeometry.setAttribute('position', new BufferAttribute(particlePositions, 3))
    const particleCloud = new Points(particleGeometry, new PointsMaterial({ color: 0x7fdfff, size: 1.2, transparent: true, opacity: 0.3 }))
    scene.add(particleCloud)

    const resize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight, false)
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
    }
    resize()

    let frameId = 0
    let lastTime = 0
    const fps = 60
    const fpsInterval = 1000 / fps

    const animate = (time) => {
      frameId = window.requestAnimationFrame(animate)
      const elapsed = time - lastTime
      if (elapsed < fpsInterval) return
      lastTime = time - (elapsed % fpsInterval)

      const t = time * 0.0005
      networkGroup.rotation.y += 0.0005
      particleCloud.rotation.y -= 0.0002

      nodes.forEach((node) => {
        node.mesh.position.x = node.base.x + Math.sin(t + node.seed) * 5
        node.mesh.position.y = node.base.y + Math.cos(t * 0.8 + node.seed) * 5
      })

      for (let i = 0; i < connections.length; i++) {
        const [a, b] = connections[i]
        const p1 = nodes[a].mesh.position
        const p2 = nodes[b].mesh.position
        linePositions[i * 6] = p1.x; linePositions[i * 6 + 1] = p1.y; linePositions[i * 6 + 2] = p1.z
        linePositions[i * 6 + 3] = p2.x; linePositions[i * 6 + 4] = p2.y; linePositions[i * 6 + 5] = p2.z
      }
      lineGeometry.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
    }

    animate(0)
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      particleGeometry.dispose()
      glowTexture.dispose()
    }
  }, [])

  return <div ref={mountRef} className="global-network-bg" style={{ willChange: 'opacity' }} />
}
