import { initialConvexHull } from '../../Objects/objects';
import { initializeLoader, modelLoader } from '../../Physics/loader';
import { physicsWorldInitialization } from '../../physicsWorld';
import { loadConvexHullActionCreator, setInitializeLoadingState } from './defaultActionCreators';


export const initialize = () => {
  return async (dispatch) => {
    dispatch(setInitializeLoadingState('loading'));
    try {
      await dispatch(loadAssets());
      await physicsWorldInitialization();
      dispatch(setInitializeLoadingState('done'));
    } catch (error) {
      console.error(error);
      dispatch(setInitializeLoadingState('failed'));
    }
  };
};

const initializeLoaderAsync = async () => {
  console.log('initialize loader');
  await initializeLoader();
};

export const loadAssets = () => {
  return async (dispatch) => {
    console.log('load assets');
    try {
      await initializeLoaderAsync();
      let duckGltf = await modelLoader('Duck.glb'); 
      duckGltf.scene.children[0].children[1].geometry = duckGltf.scene.children[0].children[1].geometry.toNonIndexed();
      dispatch(loadConvexHullActionCreator({...initialConvexHull, gltf: duckGltf}));
    } catch (error){
      console.error(error);
    }
  };
};