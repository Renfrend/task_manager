import { useSelector } from 'react-redux';

import { selectCurrentUser } from './auth.slice';

export default function useAuth() {
  const data = useSelector(selectCurrentUser);

  return {
    user: data,
    isAuth: !!data,
  };
}
