import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.key = '26677843-2a3fc57e20ccdb9e08e3bd20d'
  }

  
  get query() {
    return this.searchQuery;
  }
  
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  async fetchPictures() {
    const url = `&q=${this.query}&page=${this.page}&per_page=12&key=${this.key}`;
    // деструктуризує отримані дані в в змінну hits  
    const { data: { hits } } = await axios.get(url);
    return hits;
  }
}