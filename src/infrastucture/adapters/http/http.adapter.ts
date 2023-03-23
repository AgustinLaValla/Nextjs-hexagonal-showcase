import { AxiosInstance } from "axios";

const get = async <T>(api: AxiosInstance, path: string = ''): Promise<T> => {
  const { data } = await api.get<T>(path);
  return data;
}

const post = async <T>(api: AxiosInstance, path: string = '', payload: any): Promise<T> => {
  const { data } = await api.post<T>(path, payload);
  return data;
}

const put = async <T>(api: AxiosInstance, path: string = '', payload: any): Promise<T> => {
  const { data } = await api.put<T>(path, payload);
  return data;
}

const _delete = async <T>(api: AxiosInstance, path: string = ''): Promise<T> => {
  const { data } = await api.delete<T>(path);
  return data;
}

export const http = { get, post, put, delete: _delete };