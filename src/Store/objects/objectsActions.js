import actionTypes from '../actionsTypes';
import { createSphere } from '../../physicsWorld';
import { baseSphere } from '../../Objects/objects';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { initializeLoader, modelLoader } from '../../Physics/loader';

export const addSphereActionCreator = (payload) => {
  createSphere(baseSphere);
  return { type: actionTypes.ADD_SPHERE, payload: baseSphere };
};

export const setSpheres = (payload) => {
  return { type: actionTypes.SET_DEFAULT, payload: payload };
};
