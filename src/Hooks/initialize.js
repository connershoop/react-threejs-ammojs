import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initialize } from '../Store/default/defaultActions';

const useInitialize = (condition) => {
  const dispatch = useDispatch();
  useEffect(()=> {
    if(condition) {
      dispatch(initialize());
    }
  }, [condition]);
};

export default useInitialize;