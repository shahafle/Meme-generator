'use strict'


function onInit() {
   initGallery();
   initSaved();
}


function navigateTo(page) {
   document.querySelector('.gallery').classList.add('hidden');
   document.querySelector('.about').classList.add('hidden');
   document.querySelector('.editor').classList.add('hidden');
   document.querySelector('.saved').classList.add('hidden');
   document.querySelector('.' + page).classList.remove('hidden');
   document.querySelector(`.gallery-btn`).classList.remove('active');
   document.querySelector(`.about-btn`).classList.remove('active');
   document.querySelector(`.saved-btn`).classList.remove('active');
   document.querySelector(`.${page}-btn`).classList.add('active');
}