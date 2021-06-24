// @ts-ignore

import { useFrame } from '@react-three/fiber';
import {physicsWorld } from '../physicsWorld';

const StepSimulation = () => {

  // Does something every frame.  This is outside of React without overhead
  useFrame((state, delta) => {
    if(physicsWorld){
      physicsWorld.stepSimulation( delta, 10 );
    }
              
  });
    
  
  return null;
};

export default StepSimulation;
