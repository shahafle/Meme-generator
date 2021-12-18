'use strict'


function initGallery() {
   createKeywordsList();
   renderKeywords();
   renderGallery();
}

function renderGallery(keyword) {
   document.querySelector('.more-btn').innerText = 'More'
   const imgs = getImgsForDisplay(keyword)
   let imgsHTMLs = imgs.map(img => {
      return `<img class="gallery-img" src="./images/memes/${img.id}.jpg" onclick="onImgSelect(${img.id})">`
   })
   if (!imgs.length) imgsHTMLs = ['<p>No results found...</p>'];
   imgsHTMLs.unshift('<label class="file-input gallery-img" name="image" onchange="onImgInput(event)"><span>+ Load photo</span><input type="file"/></label>')
   document.querySelector('.gallery .images-container').innerHTML = imgsHTMLs.join('');
   if (!keyword) document.querySelector('.search-line input').value = '';
}

function renderKeywords(isMoreOpen) {
   const keywordsSet = getKeywords();
   let keywordsNum = (isMoreOpen) ? keywordsSet.length : 8;
   let datalistHTMLs = '';
   let keywordsFilter = [];
   keywordsSet.forEach(keyword => {
      datalistHTMLs += `<option value="${keyword.name}"></option>`
      keywordsFilter.push(`<button style="font-size: ${keyword.searchCount * 0.5 + 13}px;" onclick="onKeyword('${keyword.name}')">${keyword.name}</button>`)
   })
   keywordsFilter.unshift('<button class="all-btn" onclick="renderGallery()">All</button>')
   document.querySelector('#keywordsData').innerHTML = datalistHTMLs;
   document.querySelector('.filter-words-container').innerHTML = keywordsFilter.slice(0, keywordsNum).join('');
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

function onImgInput(ev) {
   loadImageFromInput(ev, DrawUploadedImg)
}

function DrawUploadedImg(img) {
   document.querySelector('.test-img').src = img.src;
   onImgSelect(0)
}

function loadImageFromInput(ev, onImageReady) {
   var reader = new FileReader()

   reader.onload = (event) => {
      console.log('onload');
      var img = new Image()
      // Render on canvas
      img.onload = onImageReady.bind(null, img)
      img.src = event.target.result
   }
   console.log('after');
   reader.readAsDataURL(ev.target.files[0])
}

function openEditor() {
   navigateTo('editor');
   document.body.classList.add('background')
}

function onMoreKeywords(elMoreBtn) {
   const isOpen = (elMoreBtn.innerText === 'More');
   elMoreBtn.innerText = (isOpen) ? 'Less' : 'More';
   renderKeywords(isOpen);
}