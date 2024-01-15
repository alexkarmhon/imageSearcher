import '../sass/main.scss';
import ImagesApiService from './APIservice';
import imageCardTpl from '../templates/image-cards.hbs';
import LoadMoreBtn from './load-more-btn';

// basicLightbox
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';

// refs
const formInputRef = document.querySelector('#search-form');
const galeryLstRef = document.querySelector('#gallery-list');
const loadMoreBtnRef = document.querySelector('#moreBtn');

// instances
const imagesApiService = new ImagesApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

function renderImagesMarkup(hits) {
  galeryLstRef.insertAdjacentHTML('beforeend', imageCardTpl(hits));
}

function clearImagesContainer() {
  galeryLstRef.innerHTML = '';
}

async function onSearch(e) {
  e.preventDefault();

  const value = e.target.elements.query.value.trim();
  if (!value) {
    return;
    // return setError({
    //   title: 'Please insert some value',
    //   delay: 500,
    // })
  }

  clearImagesContainer();

  imagesApiService.resetPage();
  imagesApiService.query = value;
  const data = await imagesApiService.fetchPictures();
  renderImagesMarkup(data);

  loadMoreBtn.show();
  formInputRef.reset();
}

async function onLoadMoreClick(e) {
  loadMoreBtn.disable();
  imagesApiService.incrementPage();
  const data = await imagesApiService.fetchPictures();
  renderImagesMarkup(data);

  galeryLstRef.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
  loadMoreBtn.enable();
}

function onImageClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(`<img class="gallery-image" src="${e.target.dataset.source}">`);
  instance.show();
}

// function fetchImages() {
//   loadMoreBtn.disable();
//   imagesApiService.fetchPictures().then((hits) => {
//     loadMoreBtn.enable();
//     formInputRef.reset();
//   })
// }

formInputRef.addEventListener('submit', onSearch);
loadMoreBtnRef.addEventListener('click', onLoadMoreClick);
galeryLstRef.addEventListener('click', onImageClick);
