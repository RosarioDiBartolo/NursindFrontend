import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios, { AxiosRequestConfig } from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export class Api {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async get(config?: AxiosRequestConfig) {
    return await axios.get(this.endpoint, config);
  }

  async post(data?: object, config?: AxiosRequestConfig) {
    return await axios.post(this.endpoint, data, config);
  }

  path(route: string) {
    const newPath = this.endpoint + route;
    return new Api(newPath);
  }
}
