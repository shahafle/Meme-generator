'use strict'


function initSaved() {
   loadMemes();
   renderSaved();
}

function renderSaved() {
   const memesDATAs = getMemesDATAs();
   let savedHTMLs = [];
   if (!memesDATAs.length) savedHTMLs = ['<p>No saved photos to show yet...</p>'];
   else savedHTMLs = memesDATAs.map((memeData, i) => `<div class="gallery-img"><img src="${memeData}" onclick="onOpenSaved(this.src)"><button class="delete-saved-btn fas fa-trash-alt fa-2x" onclick="onDeleteSaved(${i})"></button></div>`)
   document.querySelector('.saved .images-container').innerHTML = savedHTMLs.join('');
}

function onOpenSaved(savedSrc) {
   document.querySelector('.test-img').src = savedSrc;
   resetMeme();
   onImgSelect(0);
}

function onDeleteSaved(savedIdx) {
   if (!confirm('Are you sure you want to delete this Meme?')) return;
   deleteMeme(savedIdx);
   renderSaved();
}