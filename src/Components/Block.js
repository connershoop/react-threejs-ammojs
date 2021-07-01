import React, { useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { addSphereActionCreator } from '../Store/objects/objectsActions';

const Block = ({ blockPlane, id, dispatch }) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  // Rotate mesh every frame, this is outside of React without overhead
  const { scene } = useThree();
  const [hovered, setHovered] = useState(false);
  //Actions
  const handleAddSphere = () => {
    dispatch(addSphereActionCreator());
  };

  return (
    <mesh
      ref={mesh}

      position={[blockPlane.position.x, blockPlane.position.y, blockPlane.position.z]}
      scale={1}
      onClick= {()=>{handleAddSphere();}}
      onPointerOver={(event) => setHovered(true)}
      onPointerOut={(event) => setHovered(false)}>
      <boxBufferGeometry args={[2, 0.1, 2]} />
      <meshPhongMaterial color={hovered ? 'salmon' : 'gray'} />
    </mesh >
  );
};

export default Block;
