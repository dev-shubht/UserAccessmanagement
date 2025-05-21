import * as jwtDecode from 'jwt-decode';

export function getToken() {
  return localStorage.getItem('token');
}

export function isAuthenticated() {
  return !!getToken();
}

export function getRoleFromToken() {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode.default(token);
;
    return decoded.role;
  } catch (e) {
    return null;
  }
}
