import axios from 'axios';

export default async function fetchApi(query) {
  const API_KEY = '27497064-4ae9b55936b7b9caff863013f';
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;
  return await axios.get(URL);
}
