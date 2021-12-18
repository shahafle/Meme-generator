'use strict'


function initSaved() {
   loadMemes();
   renderSaved();
}

function renderSaved() {
   const memesDATAs = getMemesDATAs();
   let savedHTMLs = [];
   if (!memesDATAs.length) savedHTMLs = ['<p>No saved photos to show yet...</p>'];
   else savedHTMLs = memesDATAs.map((memeData, i) => `<img class="gallery-img" src="${memeData}" onclick="onOpenSaved(this.src)">`)
   document.querySelector('.saved .images-container').innerHTML = savedHTMLs.join('');
}

function onOpenSaved(savedSrc) {
   document.querySelector('.test-img').src = savedSrc;
   resetMeme();
   onImgSelect(0);
}