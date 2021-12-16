'use strict'


function onInit() {
   createKeywordsList();
   renderKeywords();
   renderGallery();
}

function renderGallery(keyword) {
   const imgs = getImgsForDisplay(keyword)
   const imgsHTMLs = imgs.map(img => {
      return `<img class="gallery-img" src="${img.url}" onclick="onImgSelect(${img.id})">`
   })
   document.querySelector('.images-container').innerHTML = imgsHTMLs.join('');
}

function onKeyword(keyword) {
   updateKeywordCount(keyword);
   renderKeywords();
   renderGallery(keyword);
}

function onToggleMenu() {
   document.querySelector('nav').classList.toggle('open');
   document.querySelector('.main-screen').classList.toggle('open');
}

function onImgSelect(imgId) {
   openEditor();
   initMeme(imgId);
}

function openEditor() {
   document.querySelector('.gallery').classList.toggle('open');
   document.querySelector('.editor').classList.toggle('open');
   document.body.classList.add('background')
}