// localstorage
export const get = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const remove = (key) => {
  localStorage.removeItem(key);
};

export const clear = () => {
  localStorage.clear();
};
