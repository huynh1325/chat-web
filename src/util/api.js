import axios from "./axios.customize";
import queryString from "query-string";

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

const sendRequest = async (props) => {
  let {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  const options = {
    method: method,
    headers: new Headers({ "content-type": "application/json", ...headers }),
    body: body ? JSON.stringify(body) : null,
    ...nextOption,
  };
  if (useCredentials) options.credentials = "include";

  if (queryParams) {
    url = `${url}?${queryString.stringify(queryParams)}`;
  }

  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then(function (json) {
        return {
          statusCode: res.status,
          message: json?.message ?? "",
          error: json?.error ?? "",
        };
      });
    }
  });
};

// const getUserApi = () => {
//   const URL_API = "/v1/api/user";
//   return axios.get(URL_API);
// };

export {
  createUserApi,
  loginApi,
  sendRequest,
  //  getUserApi
};
