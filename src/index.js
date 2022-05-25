import './css/main.css';
import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import axios from 'axios';
import fetchApi from './js/fetch-api';

const refs = {
  form: document.querySelector('#search-form'),
};

refs.form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(evt) {
  evt.preventDefault();
  const query = evt.currentTarget.elements.searchQuery.value;
  try {
    await fetchApi(query);
  } catch (error) {
    console.log(error);
  }
}
