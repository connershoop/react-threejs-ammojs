import React, { useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import { addSphereActionCreator } from '../Store/spheres/spheresActions';
import { Vector2 } from 'three';

const Bowl = ({ bowl, id }) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  // Rotate mesh every frame, this is outside of React without overhead
  const { scene } = useThree();
  const [hovered, setHovered] = useState(false);
  //Actions

  const points = [];
  for ( let i = 0; i < 10; i ++ ) {
    points.push( new Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
  }
  return (
    <mesh
      ref={mesh}
      castShadow={true}
      receiveShadow={true}
      position={bowl.position}
      scale={1}
      onPointerOver={(event) => setHovered(true)}
      onPointerOut={(event) => setHovered(false)}>
      <latheGeometry points={points} phiLength={2*Math.PI} />
      <meshStandardMaterial color={hovered ? 'salmon' : 'gray'} />
    </mesh >
  );
};

export default Bowl;
