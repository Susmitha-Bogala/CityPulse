import axios from 'axios';

const API_KEY = 'zzt9X2L3FwbYmgkvswyUgRxkyHEVZXGZ';

// Consumer Key:   zzt9X2L3FwbYmgkvswyUgRxkyHEVZXGZ
// Consumer Secret:  qUP8JrZOZ2G2vP93
// Application Name: susmitha-App
// Redirect URI 1: https://oauth.ticketmaster.com/oauth/login

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

export const searchEvents = async (keyword: string, city: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}events.json?countryCode=US&apikey=${API_KEY}`,
    );
    console.log('response', response);
    return response.data._embedded?.events || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
