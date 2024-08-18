import { jwtDecode } from 'jwt-decode';

export function parseExpiryTokenTime(token) {
  const decodedToken = jwtDecode(token);

  return decodedToken.exp;
}
