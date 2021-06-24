import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import Sphere from './Spheres'
import { baseSphere } from '../Objects/objects'

const Block = ({blockPlane, id}) => {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    // Rotate mesh every frame, this is outside of React without overhead
    const {scene} = useThree()
    const [hovered, setHovered] = useState(false)


    return (
      <mesh
        ref={mesh}
        position={blockPlane.position}
        scale={1} 
        onPointerOver={(event) => setHovered(true)}
        onPointerOut={(event) => setHovered(false)}
        onClick = {(event) => {addSphereToScene()}}>
        <boxBufferGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color={hovered ? 'salmon' : 'gray'} />
      </mesh>
    )
  }

  export default Block;
