import axios from "axios";

// axios.defaults.baseURL = 'https://connections-api.herokuapp.com';
const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
})

export const setToken = (token) => {
  instance.defaults.headers.common['Authorization'] = token;
}

export const dellToken = () => {
  delete instance.defaults.headers.common['Authorization'];
}

// export const singUp = async (body) => {
//   const {data} = await axios.post(`/users/signup`, body); 
//   return data; 
// }
export const singUp = async (body) => {
  return await instance.post('/users/signup', body)
}

// export const login = async (body) => {
//   const {data} = await axios.post(`/users/login`, body); 
//   setToken(`Bearer ${data.token}`)
//   return data; 
// }
export const login = async (body) => {
  const {data} = await instance.post('/users/login', body)
  setToken(`Bearer ${data.token}`)
  return data
}

// export const getProfile = async (token) => {
//   return await axios.post(`/users/logout`, token); 
// }
export const getProfile = async (token) => {
  // setToken(`Bearer ${token}`)
  const {data} =  await instance.get(`/users/current`, token);
  return data
}

// export const getProfile = async (token) => {
//   setToken(`Bearer ${token}`)
//   const {data} = await axios.get(`/users/current`); 
//   return data; 
// }
//*********************** */

export const getContacts = async (token) => {
  setToken(`Bearer ${token}`)
  const {data} = await instance.get('/contacts', token);
  return data
}

export const addContacts = async (text) => {
  const {data} = await instance.post('/contacts', text);
  return data
}

export const deleteContacts = async (taskId) => {
  const {data} = await instance.delete(`/contacts/${taskId}`);
  return data
}