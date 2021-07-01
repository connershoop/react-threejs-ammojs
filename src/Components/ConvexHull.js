import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import { Vector2 } from 'three';
import { createConvexHullShape, rigidBodies, tmpTrans } from '../physicsWorld';

const ConvexHull = ({ convexHull }) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  // Rotate mesh every frame, this is outside of React without overhead
  const { scene } = useThree();
  const [hovered, setHovered] = useState(false);
  //Actions
  useEffect(()=>{
    console.log('convexHull', convexHull);
    createConvexHullShape(convexHull);
  }, []);

  useFrame((state, delta) => {
    if (rigidBodies && rigidBodies.convexHulls[0]) {
      let ms = rigidBodies.convexHulls[0].body.getMotionState();
      if (ms) {

        ms.getWorldTransform(tmpTrans);
        let p = tmpTrans.getOrigin();
        let q = tmpTrans.getRotation();
        
        // objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );

        // update object properties here (don't use state)
        mesh.current.position.x = p.x();
        mesh.current.position.y = p.y();
        mesh.current.position.z = p.z();

        mesh.current.quaternion.x =q.x();
        mesh.current.quaternion.y =q.y();
        mesh.current.quaternion.z =q.z();
        mesh.current.quaternion.w =q.w();
        
      }
    }
  });

  return (
    <mesh
      geometry={convexHull.gltf.scene.children[0].children[1].geometry}
      ref={mesh}
      position={convexHull.position}
      scale={0.01}>
      <meshStandardMaterial  />
    </mesh>
  );
};

export default ConvexHull;
