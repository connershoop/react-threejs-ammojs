import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import Block from './Components/Block';
import { physicsWorldInitialization } from './physicsWorld';
import StepSimulation from './Components/StepSimulation';
import { blockPlanes } from './Objects/objects';
import Spheres from './Components/Spheres';


const App = () => {




  useEffect(() => {
    let start = async () => {await physicsWorldInitialization()}
    start()
  }, [])


  const blockPlaneDisplays = blockPlanes.map((blockPlane, key) => {
    return <Block 
    key={key}
    id={key}
    blockPlane
    />
  })
  
  return (
    <div
    className="App" style={{height: '100vh'}}>
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
      camera={{fov:75,  near:0.1, far: 1000, position: [1,1,4]}} 
      >
        <StepSimulation />
        {/* <hemisphereLight skyColor='#ff0000' groundColor='#ff0000' intensity={1}/> */}
        <pointLight position={[-10,10,0]} color={'white'}  />
        <Spheres />
          {blockPlaneDisplays}
      </Canvas>
    </div>
  );
}

export default App;
