// @ts-ignore

import React, { useRef,useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { tmpTrans, physicsWorld, rigidBodies} from '../physicsWorld'
import { spheres } from '../Objects/objects'

const Spheres = () => {
  // const explosions = useStore((state) => state.explosions)


    // This reference will give us direct access to the mesh
    const group = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Does something every frame.  This is outside of React without overhead
    useFrame((state, delta) => {
      if(group?.current?.children.length > 0){
            console.log(group)
              spheres.forEach((sphere, id) => {
                const mesh = group.current.children[id]
                let ms = rigidBodies.spheres[id].body.getMotionState();
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
            }
            )
          }
          }
          
    )
 
  
    return (
      <group ref={group} >
        {spheres.map((sphere, index) => {
          <instancedMesh
            key={index}
            position={sphere.position}
            scale={1}>
            <sphereBufferGeometry args = {[sphere.radius, 10, 10]} />
            <meshPhongMaterial color={sphere.color} />
          </instancedMesh>
        })
        }
      </group>

    )
  }

  export default Spheres;
