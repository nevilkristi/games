import Cookies from "js-cookie";

export const get = (key) => {
  const value = Cookies.get(key);
  if (!!value) return JSON.parse(value);
  else return null;
};

export const set = (key, value) => {
  Cookies.set(key, JSON.stringify(value), {
    path: process.env.REACT_APP_COOKIE_PATH,
    domain: process.env.REACT_APP_COOKIE_DOMAIN,
  });
};

export const remove = (key) => {
  Cookies.remove(key, {
    path: process.env.REACT_APP_COOKIE_PATH,
    domain: process.env.REACT_APP_COOKIE_DOMAIN,
  });
};

export const clear = () => {
  ["user", "token"].forEach((key) => {
    remove(key);
  });
};
