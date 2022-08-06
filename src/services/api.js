import axios from "axios";
import { get, set } from "./cookies";
import store from "store";
import { setToken } from "store/actions";

const API_URL_GAME = `${process.env.REACT_APP_API_GAMES_URL}/api/v1`;
const API_URL_ACCOUNTS = `${process.env.REACT_APP_API_ACCOUNT_URL}/api/v1`;
const API_URL_ADMIN = `${process.env.REACT_APP_API_ADMIN_URL}/api/v1`;

// const API_URL_GAME = `http://192.168.1.158:3004/api/v1`;
// const API_URL_ACCOUNTS = "http://192.168.1.122:8070/api/v1";
// const API_URL_ADMIN = "http://192.168.1.110:8081/api/v1";

const axiosAccounts = axios.create({
  baseURL: API_URL_ACCOUNTS,
});
const axiosGame = axios.create({
  baseURL: API_URL_GAME,
});

const axiosAdmin = axios.create({
  baseURL: API_URL_ADMIN,
});

const non_auth_routes = [];

const requestMiddleware = (req) => {
  if (!non_auth_routes.includes(req.url)) {
    const token = get("token");
    if (!!token)
      req.headers.authorization = token.startsWith("Bearer ")
        ? token
        : "Bearer " + token;
  }
  return req;
};

const responseMiddleware = (response) => {
  if (response?.data?.data?.token) {
    set("token", response.data.data.token);
    store.dispatch(setToken(response.data.data.token));
  }
  return response;
};

axiosAccounts.interceptors.request.use(requestMiddleware);
axiosGame.interceptors.request.use(requestMiddleware);
axiosAdmin.interceptors.request.use(requestMiddleware);

axiosAccounts.interceptors.response.use(responseMiddleware, (error) =>
  Promise.reject(error)
);
axiosGame.interceptors.response.use(responseMiddleware, (error) =>
  Promise.reject(error)
);

axiosAdmin.interceptors.response.use(responseMiddleware, (error) =>
  Promise.reject(error)
);

export { axiosAccounts, axiosGame, axiosAdmin };
