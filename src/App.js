import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Block from './Components/Block';
import { physicsWorldInitialization } from './physicsWorld';
import StepSimulation from './Components/StepSimulation';
import { initialBlockPlanes } from './Objects/objects';
import { useDispatch, useSelector } from 'react-redux';
import Sphere from './Components/Sphere';
import { addSphereActionCreator } from './Store/objects/objectsActions';
import useInitialize from './Hooks/initialize';
import ConvexHull from './Components/ConvexHull';
import CameraController from './Components/CameraController';


const App = () => {

  // Initialize
  useInitialize(true);
  const dispatch = useDispatch();

  // State
  const initializeLoadingState = useSelector(state => state.default.initializeLoadingState);
  const spheres = useSelector(state => state.objects.spheres);
  const convexHull = useSelector(state => state.objects.convexHull);

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
      blockPlane = {blockPlane}
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
      {initializeLoadingState === 'done' && <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [1, 1, 4] }}
      >
        <Suspense fallback={null}>
          <StepSimulation />
          <CameraController />
          <pointLight position={[-10, 10, 0]} color={'white'} />
          {sphereDisplays}
          {blockPlaneDisplays}
          <ConvexHull convexHull = {convexHull}/>
        </Suspense>

      </Canvas>}
    </div>
  );
};

export default App;
