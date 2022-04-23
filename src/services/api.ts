import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.pokemontcg.io/v2/',
  headers: { 'X-Api-Key': `${process.env.POKEMONTCGAPI_KEY}` },
});

export const apiRoutes = axios.create();
