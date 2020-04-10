import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  dataUpdateAction,
  dataLoadingAction,
  dataLoadingErrorAction
} from '../reducers/async';

const useAsyncStateHook = ({ stateProperty, loader, dispatch, stateValue }) => {
  const mounted = useRef(false);

  useEffect(() => {
    const load = () => {
      loader()
        .then(result => mounted.current && dispatch(dataUpdateAction(stateProperty, result)))
        .catch(error => mounted.current && dispatch(dataLoadingErrorAction(stateProperty, error)));
    };
    if (!loader) return;
    mounted.current = true;
    dispatch(dataLoadingAction(stateProperty));
    load();
    return () => (mounted.current = false);
  }, [dispatch, loader, stateProperty]);
  
  return stateValue;
};

export const useAsyncState = (stateProperty, loader = null) => {
  const dispatch = useDispatch();
  const stateValue = useSelector(state => state[stateProperty]);
  
  if (!stateValue) {
    throw new Error(
      `Property ${stateProperty} not present in network state.
      Did you forget to add the reducer?`
    );
  }

  return useAsyncStateHook({ stateProperty, loader, dispatch, stateValue });
};
