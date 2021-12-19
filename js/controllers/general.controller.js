'use strict'


function onInit() {
   initGallery();
   initSaved();
}

const pages = ['gallery', 'about', 'editor', 'saved']

function navigateTo(toPage) {
   pages.forEach(page => {
      document.querySelector('.' + page).classList.add('hidden');
      document.querySelector(`.${page}-btn`).classList.remove('active');
   });
   document.querySelector('.' + toPage).classList.remove('hidden');
   document.querySelector(`.${toPage}-btn`).classList.add('active');
}