import { useDispatch } from 'react-redux';

import { logout as logoutAction } from './auth.slice';

export default function useLogout() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };

  return { logout };
}
