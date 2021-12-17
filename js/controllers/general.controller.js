'use strict'


function navigateTo(page) {
   // console.log(document.querySelector('.gallery').classList);
   document.querySelector('.gallery').classList.add('hidden');
   document.querySelector('.about').classList.add('hidden');
   document.querySelector('.editor').classList.add('hidden');
   document.querySelector('.' + page).classList.remove('hidden');
}