import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Sphere from './Components/Sphere';
import Block from './Components/Block';
import { physicsWorldInitialization } from './physicsWorld';
import StepSimulation from './Components/StepWorld';
import { blockPlanes, spheres } from './Objects/objects';


const App = () => {


  useEffect(() => {
    let start = async () => {await physicsWorldInitialization()}
    start()
  }, [])

  const sphereDisplays = spheres.map((sphere, key) => {
    return <Sphere 
    key={key}
    id={key}
    position={[sphere.position.x, sphere.position.y, sphere.position.z]}
    />
  })

  const blockPlaneDisplays = blockPlanes.map((blockPlane, key) => {
    return <Block 
    key={key}
    id={key}
    position={[blockPlane.position.x, blockPlane.position.y, blockPlane.position.z]}
    />
  })
  
  return (
    <div className="App" style={{height: '100vh'}}>
      <header className="App-header"  style={{position: 'absolute', width: '100vw'}}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Canvas 
      camera={{fov:75,  near:0.1, far: 1000, position: [1,1,4]}} >
        <StepSimulation />
        {/* <hemisphereLight skyColor='#ff0000' groundColor='#ff0000' intensity={1}/> */}
        <pointLight position={[-10,10,0]} color={'white'}  />
         {sphereDisplays}
          {blockPlaneDisplays}
      </Canvas>
    </div>
  );
}

export default App;
