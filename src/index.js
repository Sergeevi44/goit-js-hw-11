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

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onFormSubmit(evt) {
  evt.preventDefault();

  fetchApi.query = evt.currentTarget.elements.searchQuery.value;
  fetchApi.resetPage();
  fetchApi.fetchImages().then(images => {
    clearGallery();
    addGalleryMarkup(images);
  });
}

function onLoadMoreBtnClick() {
  if (fetchApi.total <= 40) {
    return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
  fetchApi.fetchImages().then(addGalleryMarkup);
}

function addGalleryMarkup(gallery) {
  refs.gallery.insertAdjacentHTML('beforeend', makeMarkupFromTemplate(gallery));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
