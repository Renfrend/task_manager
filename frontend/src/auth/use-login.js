import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useLoginMutation } from '../api/users.api';
import { setCredentials } from './auth.slice';

export default function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginMutation, { isLoading, error }] = useLoginMutation();

  const login = async (data) => {
    await loginMutation(data)
      .unwrap()
      .then((response) => {
        dispatch(setCredentials(response));
        navigate('/');
      })
      .catch((error) => console.error(error));
  };

  return { login, isLoading, error };
}
