import axios from 'axios';

export default class FetchApi {
  constructor() {
    this.searchQuery = 'cat';
    this.page = 1;
    this.total = 500;
  }

  fetchImages() {
    const API_KEY = '27497064-4ae9b55936b7b9caff863013f';
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    return fetch(URL)
      .then(r => r.json())
      .then(result => {
        this.page += 1;
        this.total -= 40;
        return result.hits;
      });
  }
  get query() {
    this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  resetPage() {
    this.page = 1;
  }
}
