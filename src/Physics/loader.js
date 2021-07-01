import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let loader; 

export const initializeLoader = async () => {
  loader = await new GLTFLoader();
};


// this utility function allows you to use any three.js
// loader with promises and async/await
export function modelLoader(url) {
  return new Promise((resolve, reject) => {
    loader.load(url, data=> resolve(data), null, reject);
  });
}

export default loader;