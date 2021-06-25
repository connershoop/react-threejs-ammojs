import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Block from './Components/Block';
import { physicsWorldInitialization } from './physicsWorld';
import StepSimulation from './Components/StepSimulation';
import { initialBlockPlanes } from './Objects/objects';
import { useDispatch, useSelector } from 'react-redux';
import Sphere from './Components/Sphere';
import { addSphereActionCreator } from './Store/spheres/spheresActions';
import Bowl from './Components/Bowl';


const App = () => {

  // Initialize
  const dispatch = useDispatch();

  useEffect(() => {
    let start = async () => { await physicsWorldInitialization(); };
    start();
  }, []);

  // State
  const spheres = useSelector(state => state.spheres.spheres);

  //Actions
  const handleAddSphere = () => {
    dispatch(addSphereActionCreator());
  };

  // Components
  const blockPlaneDisplays = initialBlockPlanes.map((blockPlane, key) => {
    return <Block
      dispatch={dispatch}
      key={key}
      id={key}
      blockPlane
    />;
  });

  const sphereDisplays = spheres.map((sphere, index) => {
    return <Sphere key={index} sphere={sphere} index={index} />;
  });
  return (
    <div
      className="App" style={{ height: '100vh' }}>
      <header className="App-header" style={{ position: 'absolute', width: '100vw' }}>
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
        camera={{ fov: 75, near: 0.1, far: 1000, position: [1, 1, 4] }}
      >
        <StepSimulation />
        <pointLight position={[-10, 10, 0]} color={'white'} />
        {sphereDisplays}
        {blockPlaneDisplays}
      </Canvas>
    </div>
  );
};

export default App;
