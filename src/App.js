import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Sphere from './Components/Sphere';
import Block from './Components/Block';
import { physicsWorldInitialization } from './physicsWorld';
import MaskBall from './Components/maskBall';




const App = () => {

  useEffect(() => {
    let start = async () => {await physicsWorldInitialization()}
    start()
}, [])

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
        {/* <hemisphereLight skyColor='#ff0000' groundColor='#ff0000' intensity={1}/> */}
        <pointLight position={[-10,10,0]} color={'white'}  />
        <Sphere position={[0, 2, 0]}/>
        <MaskBall position={[0.2, 4, 0]} />
        <Block position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
