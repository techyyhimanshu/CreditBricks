import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store'; 
export const useStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);

  return {
    dispatch,
    getState: () => state,
  };
};



