import axios from 'axios';
import ConfigVariable from './Config';

const API_KEY = ConfigVariable.apiKey;

const BASE_URL = ConfigVariable.baseUrl;

export const searchEvents = async (keyword: string, city: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}events.json?countryCode=US&city=${city}&keyword=${keyword}&apikey=${API_KEY}`,
    );
    return response.data._embedded?.events || [];
  } catch (error) {
    return [];
  }
};

export const getEventDetails = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}events.json?countryCode=US&apikey=${API_KEY}`,
    );
    return response.data._embedded?.events || [];
  } catch (error) {
    console.log('error', error);
    return [];
  }
};
