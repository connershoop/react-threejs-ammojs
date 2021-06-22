import logo from './logo.svg';
import './App.css';
import React from 'react'
import { Canvas } from '@react-three/fiber'
import Box from './Components/Box';
import { default as Ammo } from 'ammo.js/builds/ammo';


//Ammojs Initialization
Ammo().then( start )
        
function start(){
  console.log('test')
    //code goes here

}

function App() {
  return (
    <div className="App">
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
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
