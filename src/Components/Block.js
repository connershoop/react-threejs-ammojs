import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

const Block = ({blockPlane, id}) => {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    // Rotate mesh every frame, this is outside of React without overhead
    const {scene} = useThree()

    const addSphereToScene = () => {
      const geometry = new BoxGeometry();
      const material = new MeshBasicMaterial( { color: 0x00ff00 } );
      const cube = new Mesh( geometry, material );
      scene.add( cube );
    }
    return (
      <mesh
        ref={mesh}
        position={blockPlane.position}
        scale={1} 
        onClick = {() => {addSphereToScene()}}>
        <boxBufferGeometry args={[2, 0.1, 2]} />
        <meshPhongMaterial color={blockPlane.color} />
      </mesh>
    )
  }

  export default Block;
