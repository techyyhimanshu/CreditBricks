import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import store from '../store/store';
// import * as CryptoJS from "crypto-js"

// Define action types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;
const LOGOUT = 'LOGOUT' as const;
const SET_SOCIETY = 'SET_SOCIETY' as const;

// const encryptionKey="test"

export const loginSuccess = (token: string, refereshToken: string) => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refereshToken)
  const decodedToken: { exp: number } = jwtDecode(token);
  localStorage.setItem('tokenExpiration', decodedToken.exp.toString());
  setupTokenRefresh(decodedToken.exp);
  return {
    type: LOGIN_SUCCESS,
    payload: { token },
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiration');
  localStorage.removeItem('refreshToken')
  localStorage.removeItem("allowedRoute")
  localStorage.removeItem("userType")
  localStorage.removeItem("selectedSociety")
  clearTokenRefresh();
  return {
    type: LOGOUT,
  };
};

export const setSociety = (society: any) => {
  localStorage.setItem('selectedSociety', JSON.stringify(society));
  return {
    type: SET_SOCIETY,
    payload: society,
  };
};

export const checkTokenExpiration = (token: string): boolean => {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    return currentTime < expirationTime;
  } catch (error) {
    return false;
  }
};

const setupTokenRefresh = (expirationTime: number) => {
  const currentTime = Date.now();
  const timeUntilRefresh = expirationTime * 1000 - currentTime - 30000;
  if (timeUntilRefresh > 0) {
    setTimeout(refreshToken, timeUntilRefresh);
  }
};

const clearTokenRefresh = () => {
  clearTimeout(refreshTokenTimer);
};

const setLocalData = (newToken: string, newRefreshToken: string) => {
  localStorage.setItem('token', newToken);
  localStorage.setItem('refreshToken', newRefreshToken)
  const decodedToken: { exp: number } = jwtDecode(newToken);
  setupTokenRefresh(decodedToken.exp);
}

export const refreshToken = async () => {
  const token = localStorage.getItem("token")
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const response = await axios.post('http://api.dealovate.com/api/auth/refreshToken', { token, refreshToken });
    setLocalData(response.data.data.token, response.data.data.refreshToken)
  } catch (error: any) {
    try {
      const response = await axios.post('http://api.dealovate.com/api/auth/refreshToken', { token, refreshToken });
      setLocalData(response.data.data.token, response.data.data.refreshToken)
    } catch (err: any) {
      console.error('Error refreshing token:', err.response);
      store.dispatch(logout())
    }

  }
};

// export const refreshToken = async () => {
//   try {
//     const refreshToken = localStorage.getItem('refreshToken');
//     const response = await axios.post('/auth/refreshToken', { refreshToken });
//     const newToken = response.data.data.token;
//     const newRefreshToken = response.data.data.refereshToken
//     console.log("refresh token generated first time :", newRefreshToken)
//     localStorage.setItem('token', newToken);
//     localStorage.setItem('refreshToken', newRefreshToken)
//     const decodedToken: { exp: number } = jwtDecode(newToken);
//     setupTokenRefresh(decodedToken.exp);
//   } catch (error) {
//     try{

//     }catch(err){
//       console.error('Error refreshing token:', error);
//     }

//   }
// };

// const encryptData = (data: any, key: string) => {
//   const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
//   return encryptedData;
// };

// const decryptObject = (encryptedStr: string): any => {
//   const bytes = CryptoJS.AES.decrypt(encryptedStr, encryptionKey);
//   const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   return decryptedData;
// };

// const encryptedUserInfo = encryptData(response, encryptionKey);
// const decryptuserInfo=decryptObject(encryptedUserInfo)
// console.log("encrypt",encryptedUserInfo)
// console.log("decrypt",decryptuserInfo)
// localStorage.setItem('userInfo', encryptedUserInfo);

var refreshTokenTimer: NodeJS.Timeout;