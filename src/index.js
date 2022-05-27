import './css/main.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import FetchApi from './js/fetch-api';
import makeMarkupFromTemplate from './templates/gallery.hbs';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
const fetchApi = new FetchApi();
let query = '';

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadBtnClick);

async function onFormSubmit(evt) {
  evt.preventDefault();
  query = evt.currentTarget.elements.searchQuery.value;
  try {
    const data = await fetchApi.fetchImages(query);
    const images = data.data.hits;
    console.log(images);
    if (images.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }
    const markup = makeMarkupFromTemplate(images);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    refs.loadMoreBtn.style.display = 'block';
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Something wrong');
  }
}

async function onLoadBtnClick() {
  try {
    const data = await fetchApi.fetchImages(query);
  } catch (error) {}
}
