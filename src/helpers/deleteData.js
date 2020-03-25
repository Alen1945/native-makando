import React from 'react';
import axios from 'axios';
import {store} from '../store';
import {API_URL} from 'react-native-dotenv';
function deleteData(dataUrl, dataForm) {
  return new Promise((resolve, reject) => {
    const config = {};
    const token = store.getState().dataUser.token;
    if (token) {
      config.headers = {Authorization: `Bearer ${token}`};
    }
    const url = API_URL + dataUrl;
    axios
      .delete(url, config)
      .then(result => {
        resolve(result);
      })
      .catch(e => {
        reject(e);
      });
  });
}
export default deleteData;
