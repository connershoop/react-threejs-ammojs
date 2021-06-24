import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

const Block = ({position, id}) => {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    // Rotate mesh every frame, this is outside of React without overhead
  
    return (
      <mesh
        ref={mesh}
        position={position}
        scale={1} >
        <boxBufferGeometry args={[2, 0.1, 2]} />
        <meshPhongMaterial color={'orange'} />
      </mesh>
    )
  }

  export default Block;
