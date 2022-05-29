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

async function onFormSubmit(evt) {
  evt.preventDefault();
  fetchApi.query = evt.currentTarget.elements.searchQuery.value;
  fetchApi.resetPage();
  clearGallery();
  try {
    const images = await fetchApi.fetchImages();
    if (images.hits.length === 0) {
      return Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }
    Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images`);
    fetchApi.totalHits = images.totalHits;
    addGalleryMarkup(images.hits);
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong!');
    console.log(error);
  }
}

async function onLoadMoreBtnClick() {
  let remainder = fetchApi.totalHits - fetchApi.total;

  if (remainder === 0) {
    refs.loadMoreBtn.style.display = 'none';
    return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
  }

  if (remainder < fetchApi.perPage) {
    fetchApi.perPage = remainder;
  }
  try {
    const moreImages = await fetchApi.fetchImages();
    addGalleryMarkup(moreImages.hits);
  } catch (error) {
    Notiflix.Notify.failure('Something went wrong!');
    console.log(error);
  }
}

function addGalleryMarkup(gallery) {
  refs.gallery.insertAdjacentHTML('beforeend', makeMarkupFromTemplate(gallery));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
