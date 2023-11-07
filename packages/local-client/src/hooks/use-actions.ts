import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(()=> {// sürekli createbundle ı çağırdığı için html ekranın göz kırpmasını engellemek için kullanıldı
    //bind the action creators one time and never again almost like a use state and use effect put together
    return bindActionCreators(actionCreators,dispatch);
  }, [dispatch]);
};
