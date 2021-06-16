import {API} from '../Backend';
import axios from 'axios';

export const uploadFile = (userId, data, options)=> {
    
    return axios(`/api/file/${userId}`, {
        method: 'POST',
        data: data,
        onUploadProgress: options
      })
        .then(response => response.data)
        .catch(error => {
          throw error;
        });
}
export const getAllFiles = (userId)=> {
    return axios(`/api/getfiles/${userId}`, {
        method: 'GET'
      })
        .then(response => response.data)
        .catch(error => {
          throw error;
        });
}
export const getFile = ()=> {
    return axios(`/api/file/9e1ec89bd77f32b6d8afb8a5ccd875b9.png`, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Headers':'Range',
          'Access-Control-Expose-Headers': "Content-Range, Content-Length, Accept-Ranges",
          'Access-Control-Allow-Methods':'GET'
        }
      })
        .then(response => response.data)
        .catch(error => {
          throw error;
        });
}

export const markStar = (userId, fileName)=> {
  return axios(`/api/file/makefav/${userId}/${fileName}`, {
    method: 'GET',
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
export const getStar = (userId)=> {
  return axios(`/api/file/getfav/${userId}`, {
    method: 'GET',
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
export const removeFile = (userId, fileName)=> {
  return axios(`/api/removeFile/${fileName}/${userId}`, {
    method: 'DELETE',
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export const reWrite = (rename, fileName)=> {
  return axios.post(`/api/file/rename/${fileName}`, {rename: rename})
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}