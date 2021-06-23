// @ts-ignore

import React, { useRef,useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { tmpTrans, physicsWorld, ball } from '../physicsWorld'

const Sphere = (props) => {


    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Does something every frame.  This is outside of React without overhead
    useFrame((state, delta) => {
        if(physicsWorld){
                physicsWorld.stepSimulation( delta, 10 );
                let ms = ball.getMotionState();
                if ( ms ) {

                ms.getWorldTransform( tmpTrans );
                let p = tmpTrans.getOrigin();
                let q = tmpTrans.getRotation();
                // objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );

                // update object properties here (don't use state)
                mesh.current.position.x = p.x()
                mesh.current.position.y = p.y()
                mesh.current.position.z = p.z()
                }
            }}
    )
  
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 2 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <sphereBufferGeometry args = {[0.2, 10, 10]} />
        <meshPhongMaterial color={hovered ? 'hotpink' : 'blue'} />
      </mesh>
    )
  }

  export default Sphere;
