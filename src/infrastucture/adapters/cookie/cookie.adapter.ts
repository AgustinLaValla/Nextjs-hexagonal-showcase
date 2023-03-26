import Cookie from 'js-cookie';

export const setCookie = (name: string, payload: string) => Cookie.set(name, payload);
export const getCookie = (name: string) => Cookie.get(name);
export const removeCookie = (name: string) => Cookie.remove(name);

export const cookies = {
  getCookie,
  setCookie,
  removeCookie
}