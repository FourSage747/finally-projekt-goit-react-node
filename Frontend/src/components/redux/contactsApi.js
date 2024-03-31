import axios from "axios";

const instance = axios.create({
  baseURL: 'https://finally-projekt-goit-react-node.onrender.com',
})

export const getProducts = async () => {
  const {data} = await instance.get('/api/products')
  return data
}

export const setToken = (token) => {
  instance.defaults.headers.common['Authorization'] = token;
}

// export const dellToken = () => {
//   delete instance.defaults.headers.common['Authorization'];
// }


export const singUp = async (body) => {
  return await instance.post('/api/users/register', body)
}


export const login = async (body) => {
  // return await instance.post('/api/users/login', body)
  const {data} = await instance.post('/api/users/login', body)
  console.log(data)
  // setToken(`Bearer ${data.token}`)
  return data
}


// export const getProfile = async (token) => {
//   // setToken(`Bearer ${token}`)
//   const {data} =  await instance.get(`/users/current`, token);
//   return data
// }


// export const getContacts = async (token) => {
//   setToken(`Bearer ${token}`)
//   const {data} = await instance.get('/contacts', token);
//   return data
// }

// export const addContacts = async (text) => {
//   const {data} = await instance.post('/contacts', text);
//   return data
// }

// export const deleteContacts = async (taskId) => {
//   const {data} = await instance.delete(`/contacts/${taskId}`);
//   return data
// }