import axios from 'axios';
import { readFromLS, writeToLS } from './localStoreApi';
import smartFilter from './smartFilter';
axios.defaults.baseURL =
  'https://64fe20da596493f7af7ef023.mockapi.io/advert/catalog';
//all + pages
export const getCars = async (page = 1) => {
  const res = await axios.get(`?page=${page}&limit=8`);
  return res.data;
};

//car by id
export const getCarById = async id => {
  const res = await axios.get(`/${id}`);
  console.log(res.data);
  return res.data;
};
//add / remove to favs
export const adToFavs = async (id, status) => {
  const res = await axios.put(`/${id}`, { favs: status });
  return res.data;
};

// get all favs
export const getFavotites = async (page = 1) => {
  const res = await axios.get(`?favs=true&page=${page}&limit=8`);
  return res.data;
};

//get all
export const getAll = async () => {
  const defaultRes = await axios.get(`/`);
  return defaultRes;
};

//search engine
export const search = async (obj, page, shouldUpdateCache) => {
  if (shouldUpdateCache) {
    const defaultRes = await getAll();
    writeToLS('cars', defaultRes.data);
    const data = readFromLS('cars');
    const result = await smartFilter(data, obj);
    return result.slice(0, page * 8);
    // const data = await readFromLS('cars');
    // return data.slice(0, page * 8);
  }
  if (readFromLS('cars')) {
    const data = readFromLS('cars');
    const result = await smartFilter(data, obj);
    return result.slice(0, page * 8);
    // const data = await readFromLS('cars');
    // return data.slice(0, page * 8);
  }
};
