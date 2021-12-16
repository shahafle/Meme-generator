'use strict'


function onInit() {
   createKeywordsList();
   renderKeywords();
   renderGallery();
}

function renderGallery(keyword) {
   const imgs = getImgsForDisplay(keyword)
   let imgsHTMLs = imgs.map(img => {
      return `<img class="gallery-img" src="./images/memes/${img.id}.jpg" onclick="onImgSelect(${img.id})">`
   })
   if (!imgs.length) imgsHTMLs = ['<p>No results found...</p>'];
   document.querySelector('.images-container').innerHTML = imgsHTMLs.join('');
   if (!keyword) document.querySelector('.search-line input').value = '';
}

function renderKeywords() {
   const keywordsSet = getKeywords();
   let datalistHTMLs = '';
   let keywordsFilter = [];
   keywordsSet.forEach((keyword, i) => {
      datalistHTMLs += `<option value="${keyword.name}"></option>`
      keywordsFilter.push(`<button style="font-size: ${keyword.searchCount * 0.5 + 13}px;" onclick="onKeyword('${keyword.name}')">${keyword.name}</button>`)
   })
   document.querySelector('#keywordsData').innerHTML = datalistHTMLs;
   document.querySelector('.categories-not-all').innerHTML = keywordsFilter.slice(0, 6).join('');
}

function onKeyword(keyword) {
   updateKeywordCount(keyword);
   document.querySelector('.search-line input').value = keyword;
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