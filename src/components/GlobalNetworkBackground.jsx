import { useEffect, useRef } from 'react'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CylinderGeometry,
  DoubleSide,
  FogExp2,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  RingGeometry,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
} from 'three'

const NODE_COUNT = 28
const PARTICLE_COUNT = 110
const BOUNDS = 190
const CONNECTION_DISTANCE = 78
const FLOW_COUNT = 22

function toWorldPosition(clientX, clientY) {
  return {
    x: (clientX / window.innerWidth - 0.5) * BOUNDS * 1.08,
    y: (0.5 - clientY / window.innerHeight) * BOUNDS * 0.82,
  }
}

function createNodeMaterial(color, opacity) {
  return new MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
  })
}

function createGlowTexture() {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')

  if (!context) return null

  const gradient = context.createRadialGradient(size / 2, size / 2, 6, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.18, 'rgba(168, 244, 255, 0.95)')
  gradient.addColorStop(0.44, 'rgba(0, 234, 255, 0.42)')
  gradient.addColorStop(0.72, 'rgba(120, 124, 255, 0.14)')
  gradient.addColorStop(1, 'rgba(0,0,0,0)')

  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  return new CanvasTexture(canvas)
}

function createNodeMesh(index) {
  const tone = [0x00eaff, 0x5cd6ff, 0x8f7cff][index % 3]
  const isHub = index % 7 === 0

  if (isHub) {
    return new Mesh(new IcosahedronGeometry(2.2, 0), createNodeMaterial(tone, 0.86))
  }

  if (index % 5 === 0) {
    return new Mesh(new OctahedronGeometry(1.6, 0), createNodeMaterial(tone, 0.82))
  }

  if (index % 4 === 0) {
    return new Mesh(new IcosahedronGeometry(1.25, 0), createNodeMaterial(tone, 0.76))
  }

  return new Mesh(new SphereGeometry(1.15, 10, 10), createNodeMaterial(tone, 0.78))
}

export default function GlobalNetworkBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return undefined

    const mount = mountRef.current
    const scene = new Scene()
    scene.fog = new FogExp2(0x040714, 0.0034)
    const camera = new PerspectiveCamera(58, 1, 0.1, 1000)
    camera.position.z = 175

    const renderer = new WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const networkGroup = new Group()
    scene.add(networkGroup)
    const glowTexture = createGlowTexture()

    const pointer = { x: 0, y: 0, active: false }
    const dragState = { active: false, nodeIndex: -1 }
    const ripples = []
    const particles = []

    const startDrag = (nodeIndex) => {
      dragState.active = true
      dragState.nodeIndex = nodeIndex
      document.body.classList.add('network-dragging')
    }

    const stopDrag = () => {
      dragState.active = false
      dragState.nodeIndex = -1
      document.body.classList.remove('network-dragging')
    }

    const nodes = Array.from({ length: NODE_COUNT }, (_, index) => {
      const mesh = createNodeMesh(index)
      const isHub = index % 7 === 0
      mesh.position.set(
        (Math.random() - 0.5) * BOUNDS,
        (Math.random() - 0.5) * BOUNDS,
        (Math.random() - 0.5) * BOUNDS,
      )

      const halo = new Mesh(
        new SphereGeometry(isHub ? 6.4 : index % 4 === 0 ? 4.2 : 3.5, 8, 8),
        createNodeMaterial(index % 3 === 2 ? 0x8f7cff : 0x00eaff, isHub ? 0.07 : 0.04),
      )
      mesh.add(halo)

      const core = new Mesh(
        new SphereGeometry(isHub ? 0.42 : 0.28, 8, 8),
        createNodeMaterial(0xe8fdff, 0.92),
      )
      mesh.add(core)

      let shell = null
      if (index % 3 === 0) {
        shell = new Mesh(
          new IcosahedronGeometry(index % 5 === 0 ? 2.2 : 1.9, 0),
          new MeshBasicMaterial({
            color: index % 3 === 2 ? 0x8f7cff : 0x00eaff,
            transparent: true,
            opacity: 0.08,
            wireframe: true,
          }),
        )
        mesh.add(shell)
      }

      let ring = null
      if (index % 6 === 0) {
        ring = new Mesh(
          new TorusGeometry(isHub ? 4.4 : 2.6, 0.07, 8, 24),
          createNodeMaterial(0x00eaff, 0.22),
        )
        ring.rotation.x = Math.PI / 2
        mesh.add(ring)
      }

      let satellitePivot = null
      let satellites = []
      if (isHub) {
        satellitePivot = new Group()
        satellitePivot.rotation.x = Math.PI * 0.24
        satellitePivot.rotation.y = index * 0.6
        mesh.add(satellitePivot)

        satellites = Array.from({ length: 2 + (index % 2) }, (_, satelliteIndex) => {
          const satellite = new Mesh(
            new SphereGeometry(0.18, 6, 6),
            createNodeMaterial(satelliteIndex % 2 === 0 ? 0xe8fdff : 0x8f7cff, 0.9),
          )
          satellite.position.set(3.6 + satelliteIndex * 0.95, 0, 0)
          satellitePivot.add(satellite)
          return satellite
        })
      }

      networkGroup.add(mesh)

      return {
        isHub,
        mesh,
        halo,
        core,
        shell,
        ring,
        satellitePivot,
        satellites,
        base: mesh.position.clone(),
        impulse: new Vector3(),
        seed: index * 0.29,
      }
    })

    const connections = []
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        if (nodes[i].base.distanceTo(nodes[j].base) < CONNECTION_DISTANCE) {
          connections.push([i, j])
        }
      }
    }

    const linePositions = new Float32Array(connections.length * 6)
    const lineGeometry = new BufferGeometry()
    lineGeometry.setAttribute('position', new BufferAttribute(linePositions, 3))
    const lineMaterial = new LineBasicMaterial({
      color: 0x00eaff,
      transparent: true,
      opacity: 0.09,
    })
    const lines = new LineSegments(lineGeometry, lineMaterial)
    networkGroup.add(lines)

    const anomalies = Array.from({ length: 3 }, (_, index) => {
      const anchor = new Group()
      anchor.position.set(
        index === 0 ? -92 : index === 1 ? 96 : 12,
        index === 0 ? 54 : index === 1 ? -42 : -82,
        index === 0 ? -48 : index === 1 ? -36 : -70,
      )

      const glow = new Sprite(
        new SpriteMaterial({
          map: glowTexture,
          color: index === 0 ? 0xff2f6d : index === 1 ? 0x00eaff : 0x6d5cff,
          transparent: true,
          opacity: index === 2 ? 0.24 : 0.3,
          depthWrite: false,
          blending: AdditiveBlending,
        }),
      )
      glow.scale.set(index === 2 ? 78 : 96, index === 2 ? 78 : 96, 1)
      anchor.add(glow)

      const core = new Mesh(
        new IcosahedronGeometry(index === 2 ? 3.8 : 4.6, 0),
        createNodeMaterial(index === 0 ? 0xff5d8f : index === 1 ? 0x5cd6ff : 0x8f7cff, 0.34),
      )
      anchor.add(core)

      const ringA = new Mesh(
        new TorusGeometry(index === 2 ? 7.4 : 9.6, 0.1, 10, 56),
        createNodeMaterial(index === 0 ? 0xff5d8f : 0x00eaff, 0.18),
      )
      ringA.rotation.x = Math.PI / 2.4
      ringA.rotation.y = index * 0.6
      anchor.add(ringA)

      const ringB = new Mesh(
        new TorusGeometry(index === 2 ? 11.2 : 13.5, 0.08, 10, 64),
        createNodeMaterial(index === 1 ? 0xe8fdff : 0x8f7cff, 0.12),
      )
      ringB.rotation.x = Math.PI / 3.2
      ringB.rotation.z = Math.PI / 4
      anchor.add(ringB)

      networkGroup.add(anchor)

      return {
        anchor,
        glow,
        core,
        ringA,
        ringB,
        baseX: anchor.position.x,
        baseY: anchor.position.y,
        seed: index * 1.7,
      }
    })

    const flowConnections = connections
      .filter((_, index) => index % Math.max(1, Math.floor(connections.length / FLOW_COUNT)) === 0)
      .slice(0, FLOW_COUNT)

    const flowGeometry = new SphereGeometry(0.34, 8, 8)
    const flows = flowConnections.map(([from, to], index) => {
      const mesh = new Mesh(
        flowGeometry,
        createNodeMaterial(index % 2 === 0 ? 0xe8fdff : 0x8f7cff, 0.88),
      )
      networkGroup.add(mesh)
      return {
        mesh,
        from,
        to,
        progress: Math.random(),
        speed: 0.0025 + (index % 4) * 0.00045,
      }
    })

    const beaconMaterial = createNodeMaterial(0x00eaff, 0.08)
    const beacons = nodes
      .filter((node) => node.isHub)
      .map((node, index) => {
        const beam = new Mesh(new CylinderGeometry(0.45, 1.8, 42, 12, 1, true), beaconMaterial.clone())
        beam.position.set(node.mesh.position.x, node.mesh.position.y, node.mesh.position.z)
        beam.rotation.x = Math.PI / 2
        networkGroup.add(beam)
        return {
          beam,
          node,
          seed: index * 1.1,
        }
      })

    const particleGeometry = new BufferGeometry()
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3)
    const particleMeta = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
      const x = (Math.random() - 0.5) * BOUNDS * 1.35
      const y = (Math.random() - 0.5) * BOUNDS * 1.1
      const z = (Math.random() - 0.5) * BOUNDS * 0.9

      particlePositions[index * 3] = x
      particlePositions[index * 3 + 1] = y
      particlePositions[index * 3 + 2] = z

      return {
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        vz: (Math.random() - 0.5) * 0.05,
      }
    })

    particleGeometry.setAttribute('position', new BufferAttribute(particlePositions, 3))
    const particleMaterial = new PointsMaterial({
      color: 0x7fdfff,
      size: 1.35,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: AdditiveBlending,
    })
    const particleCloud = new Points(particleGeometry, particleMaterial)
    scene.add(particleCloud)

    const resize = () => {
      const { clientWidth, clientHeight } = mount
      camera.aspect = clientWidth / Math.max(clientHeight, 1)
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight, false)
    }

    const createRipple = (clientX, clientY) => {
      const world = toWorldPosition(clientX, clientY)
      const rippleMaterial = createNodeMaterial(0x00eaff, 0.22)
      rippleMaterial.side = DoubleSide
      const ripple = new Mesh(new RingGeometry(2.8, 3.25, 48), rippleMaterial)
      ripple.position.set(world.x, world.y, 10)
      networkGroup.add(ripple)
      ripples.push({ mesh: ripple, material: rippleMaterial, life: 0 })

      nodes.forEach((node) => {
        const dx = node.base.x - world.x
        const dy = node.base.y - world.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 76) {
          const force = (1 - dist / 76) * 3.4
          node.impulse.x += (dx / Math.max(dist, 1)) * force
          node.impulse.y += (dy / Math.max(dist, 1)) * force
        }
      })
    }

    const handlePointerMove = (event) => {
      const world = toWorldPosition(event.clientX, event.clientY)
      pointer.x = world.x
      pointer.y = world.y
      pointer.active = true
    }

    const handlePointerLeave = () => {
      pointer.active = false
      stopDrag()
    }

    const handlePointerDown = (event) => {
      const world = toWorldPosition(event.clientX, event.clientY)
      pointer.x = world.x
      pointer.y = world.y
      pointer.active = true

      let nearestIndex = -1
      let nearestDistance = Infinity
      for (let i = 0; i < nodes.length; i += 1) {
        const distance = nodes[i].mesh.position.distanceTo(
          new Vector3(world.x, world.y, nodes[i].mesh.position.z),
        )
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestIndex = i
        }
      }

      if (nearestIndex >= 0 && nearestDistance < 22) {
        startDrag(nearestIndex)
      } else {
        createRipple(event.clientX, event.clientY)
      }
    }

    const handlePointerUp = () => {
      stopDrag()
    }

    resize()

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointerVector = new Vector3()
    const cameraTarget = new Vector3(0, 0, 175)
    let frameId = 0
    let time = 0

    const animate = () => {
      time += 0.008

      if (!reduceMotion) {
        networkGroup.rotation.y += 0.00048
        networkGroup.rotation.x += 0.0001
        particleCloud.rotation.y -= 0.00012
      }

      if (pointer.active) {
        pointerVector.set(pointer.x, pointer.y, 0)
        cameraTarget.x = MathUtils.clamp(pointer.x * 0.05, -8, 8)
        cameraTarget.y = MathUtils.clamp(pointer.y * 0.035, -6, 6)
      } else {
        cameraTarget.x *= 0.94
        cameraTarget.y *= 0.94
      }

      camera.position.x += (cameraTarget.x - camera.position.x) * 0.04
      camera.position.y += (cameraTarget.y - camera.position.y) * 0.04
      camera.lookAt(0, 0, 0)

      nodes.forEach((node) => {
        const driftX = Math.sin(time + node.seed) * 0.08
        const driftY = Math.cos(time * 0.82 + node.seed) * 0.065
        const driftZ = Math.sin(time * 0.66 + node.seed) * 0.05

        let targetX = node.base.x + driftX * 10 + node.impulse.x
        let targetY = node.base.y + driftY * 10 + node.impulse.y
        const targetZ = node.base.z + driftZ * 10

        if (dragState.active && dragState.nodeIndex >= 0 && nodes[dragState.nodeIndex] === node) {
          targetX = pointer.x
          targetY = pointer.y
          node.impulse.set(0, 0, 0)
        } else if (pointer.active) {
          const dx = pointer.x - targetX
          const dy = pointer.y - targetY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 70) {
            const influence = (1 - dist / 70) * 2.2
            targetX += (dx / Math.max(dist, 1)) * influence
            targetY += (dy / Math.max(dist, 1)) * influence
          }
        }

        node.mesh.position.set(targetX, targetY, targetZ)

        const hoverBoost = pointer.active
          ? Math.max(0, 1 - node.mesh.position.distanceTo(pointerVector) / 74) * 0.34
          : 0
        const dragBoost = dragState.active && dragState.nodeIndex >= 0 && nodes[dragState.nodeIndex] === node
          ? 0.3
          : 0
        const pulse = 1 + (reduceMotion ? 0 : (Math.sin(time * 2 + node.seed) + 1) * 0.085)
        const hubBoost = node.isHub ? 0.24 : 0
        node.mesh.scale.setScalar(pulse + hubBoost + hoverBoost * 0.34 + dragBoost)
        node.halo.scale.setScalar(1.1 + pulse * 0.26 + hubBoost * 0.8 + hoverBoost * 0.42 + dragBoost * 0.35)
        node.mesh.material.opacity = Math.min(1, 0.62 + hubBoost * 0.35 + hoverBoost * 0.95 + dragBoost * 0.2)
        node.halo.material.opacity = 0.035 + hubBoost * 0.05 + hoverBoost * 0.14 + dragBoost * 0.08
        node.core.material.opacity = Math.min(1, 0.86 + hoverBoost * 0.4 + dragBoost * 0.1)
        node.core.scale.setScalar(1 + hoverBoost * 0.35 + dragBoost * 0.25)

        if (node.ring) {
          node.ring.rotation.z += node.isHub ? 0.018 : 0.012
          node.ring.material.opacity = 0.14 + hubBoost * 0.18 + hoverBoost * 0.24
          node.ring.scale.setScalar(1 + hubBoost * 0.2 + hoverBoost * 0.18)
        }

        if (node.shell) {
          node.shell.rotation.y += 0.004
          node.shell.rotation.x += 0.0025
          node.shell.material.opacity = 0.06 + hoverBoost * 0.12
          node.shell.scale.setScalar(1 + hoverBoost * 0.16)
        }

        if (node.satellitePivot) {
          node.satellitePivot.rotation.z += 0.01
          node.satellitePivot.rotation.y += 0.003
          node.satellites.forEach((satellite, satelliteIndex) => {
            const satellitePulse = 1 + Math.sin(time * 3 + node.seed + satelliteIndex) * 0.12
            satellite.scale.setScalar(satellitePulse + hoverBoost * 0.28)
            satellite.material.opacity = Math.min(1, 0.74 + hoverBoost * 0.22)
          })
        }

        node.impulse.multiplyScalar(0.92)
      })

      for (let i = 0; i < connections.length; i += 1) {
        const [a, b] = connections[i]
        const first = nodes[a].mesh.position
        const second = nodes[b].mesh.position
        const offset = i * 6
        linePositions[offset] = first.x
        linePositions[offset + 1] = first.y
        linePositions[offset + 2] = first.z
        linePositions[offset + 3] = second.x
        linePositions[offset + 4] = second.y
        linePositions[offset + 5] = second.z
      }
      lineGeometry.attributes.position.needsUpdate = true

      flows.forEach((flow, index) => {
        const from = nodes[flow.from].mesh.position
        const to = nodes[flow.to].mesh.position
        flow.progress = (flow.progress + (reduceMotion ? flow.speed * 0.45 : flow.speed)) % 1
        flow.mesh.position.lerpVectors(from, to, flow.progress)
        const glow = 1 + Math.sin(time * 4 + index) * 0.18
        flow.mesh.scale.setScalar(glow)
        flow.mesh.material.opacity = 0.58 + Math.sin(time * 3 + index) * 0.2
      })

      anomalies.forEach((anomaly) => {
        const floatY = Math.sin(time * 0.7 + anomaly.seed) * 5
        const floatX = Math.cos(time * 0.5 + anomaly.seed) * 3
        anomaly.anchor.position.y += (anomaly.baseY + floatY - anomaly.anchor.position.y) * 0.08
        anomaly.anchor.position.x += (anomaly.baseX + floatX - anomaly.anchor.position.x) * 0.08
        anomaly.glow.material.opacity = 0.2 + Math.sin(time * 1.4 + anomaly.seed) * 0.06
        anomaly.core.rotation.x += 0.004
        anomaly.core.rotation.y += 0.005
        anomaly.ringA.rotation.z += 0.006
        anomaly.ringB.rotation.z -= 0.004
      })

      beacons.forEach((beacon) => {
        beacon.beam.position.copy(beacon.node.mesh.position)
        beacon.beam.scale.y = 0.84 + Math.sin(time * 1.8 + beacon.seed) * 0.12
        beacon.beam.material.opacity = 0.04 + Math.max(0, Math.sin(time * 2.2 + beacon.seed)) * 0.08
      })

      for (let i = 0; i < particleMeta.length; i += 1) {
        const particle = particleMeta[i]
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        if (particle.x > BOUNDS || particle.x < -BOUNDS) particle.vx *= -1
        if (particle.y > BOUNDS * 0.8 || particle.y < -BOUNDS * 0.8) particle.vy *= -1
        if (particle.z > BOUNDS * 0.6 || particle.z < -BOUNDS * 0.6) particle.vz *= -1

        if (pointer.active) {
          const dx = pointer.x - particle.x
          const dy = pointer.y - particle.y
          const distSq = dx * dx + dy * dy
          if (distSq < 7200) {
            particle.x += dx * 0.002
            particle.y += dy * 0.002
          }
        }

        particlePositions[i * 3] = particle.x
        particlePositions[i * 3 + 1] = particle.y
        particlePositions[i * 3 + 2] = particle.z
      }
      particleGeometry.attributes.position.needsUpdate = true

      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        const ripple = ripples[i]
        ripple.life += 0.018
        ripple.mesh.scale.setScalar(1 + ripple.life * 10)
        ripple.material.opacity = Math.max(0, 0.22 - ripple.life * 0.14)

        if (ripple.life > 1.6) {
          networkGroup.remove(ripple.mesh)
          ripple.mesh.geometry.dispose()
          ripple.material.dispose()
          ripples.splice(i, 1)
        }
      }

      renderer.render(scene, camera)
      frameId = window.requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointerleave', handlePointerLeave)
      document.body.classList.remove('network-dragging')
      mount.removeChild(renderer.domElement)
      ripples.forEach((ripple) => {
        networkGroup.remove(ripple.mesh)
        ripple.mesh.geometry.dispose()
        ripple.material.dispose()
      })
      lineGeometry.dispose()
      lineMaterial.dispose()
      flowGeometry.dispose()
      glowTexture?.dispose()
      anomalies.forEach((anomaly) => {
        networkGroup.remove(anomaly.anchor)
        anomaly.glow.material.dispose()
        anomaly.core.geometry.dispose()
        anomaly.core.material.dispose()
        anomaly.ringA.geometry.dispose()
        anomaly.ringA.material.dispose()
        anomaly.ringB.geometry.dispose()
        anomaly.ringB.material.dispose()
      })
      nodes.forEach((node) => {
        node.mesh.geometry.dispose()
        node.mesh.material.dispose()
        node.halo.geometry.dispose()
        node.halo.material.dispose()
        node.core.geometry.dispose()
        node.core.material.dispose()
        node.shell?.geometry.dispose()
        node.shell?.material.dispose()
        node.ring?.geometry.dispose()
        node.ring?.material.dispose()
        node.satellites?.forEach((satellite) => {
          satellite.geometry.dispose()
          satellite.material.dispose()
        })
      })
      flows.forEach((flow) => {
        networkGroup.remove(flow.mesh)
        flow.mesh.material.dispose()
      })
      beacons.forEach((beacon) => {
        networkGroup.remove(beacon.beam)
        beacon.beam.geometry.dispose()
        beacon.beam.material.dispose()
      })
      particleGeometry.dispose()
      particleMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="global-network-bg" aria-hidden="true" />
}
