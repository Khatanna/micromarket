import { create } from "zustand";
import axios, { AxiosInstance } from "axios";

interface State {
  axios: AxiosInstance;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const useAxiosStore = create<State>()(() => ({
  axios: instance,
}));
