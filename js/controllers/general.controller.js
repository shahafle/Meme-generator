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
}