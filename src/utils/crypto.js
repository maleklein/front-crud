import CryptoJS from 'crypto-js';

// Accedemos a la variable de entorno
const SECRET_KEY = process.env.REACT_APP_CRYPTO_SECRET;

export const encryptPassword = (password) => {
  if (!password) return '';
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};