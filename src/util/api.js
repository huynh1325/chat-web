import axios from "./axios.customize";

const createUserApi = (email, password, name) => {
  const URL_API = "api/v1/auth/register";
  const data = {
    email,
    password,
    name,
  };
  return axios.post(URL_API, data);
};

const loginApi = (email, password) => {
  const URL_API = "api/v1/auth/login";
  const data = {
    username: email,
    password,
  };
  return axios.post(URL_API, data);
};

// const getUserApi = () => {
//   const URL_API = "/v1/api/user";
//   return axios.get(URL_API);
// };

export {
  createUserApi,
  loginApi,
  //  getUserApi
};
