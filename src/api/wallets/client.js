import axios from 'axios';
import {servers} from '../const.js';

const createClient = (baseURL) => {
  const client = axios.create({baseURL});

  client.interceptors.response.use(null, (error) => {
    if (error.response && Number(error.response.status) >= 500) {
      console.error('Request failed', error);
    }

    return Promise.reject(error);
  });

  return client;
};

export class ClientApi {
  constructor(name) {
    const baseURL = servers[name];
    const baseServiceURL = servers[`${name}service`];

    this.client = createClient(baseURL);
    this.serviceClient = createClient(baseServiceURL);

    this.crypto = name;
  }

  async _get(endpoint, params = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const response = await axios.get(url, {params});

    return response.data;
  }

  async _post(endpoint, data = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const response = await this.serviceClient.post(url, data);

    return response.data;
  }

  async _getService(endpoint, params = {}) {
    const url = `${this.baseServiceURL}${endpoint}`;

    const response = await axios.get(url, {params});

    return response.data;
  }
}
