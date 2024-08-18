import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useRegisterMutation } from '../api/users.api';
import { setCredentials } from './auth.slice';

export default function useRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerMutation, { isLoading, error }] = useRegisterMutation();

  const register = async (data) => {
    await registerMutation(data)
      .unwrap()
      .then((response) => {
        dispatch(setCredentials(response));
        navigate('/');
      })
      .catch((error) => console.error(error));
  };

  return { register, isLoading, error };
}
