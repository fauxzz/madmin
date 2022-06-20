export const setStorage = (key, value) =>
    window.localStorage.setItem(key, JSON.stringify(value));

export const getStorage = (key) =>
    JSON.parse(window.localStorage.getItem(key));

export const deleteStorage = (key) =>
    window.localStorage.removeItem(key);