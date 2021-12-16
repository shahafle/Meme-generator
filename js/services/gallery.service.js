'use strict'


let gKeywords = [];
let gImgs = [
   {
      id: 1,
      url: './images/memes/1.jpg',
      keywords: ['men', 'celebrity']
   }, {
      id: 2,
      url: './images/memes/2.jpg',
      keywords: ['cute', 'animal']
   }, {
      id: 3,
      url: './images/memes/3.jpg',
      keywords: ['cute', 'kids', 'animal']
   }, {
      id: 4,
      url: './images/memes/4.jpg',
      keywords: ['cute', 'animal']
   }, {
      id: 5,
      url: './images/memes/5.jpg',
      keywords: ['cute', 'kids']
   }, {
      id: 6,
      url: './images/memes/6.jpg',
      keywords: ['men', 'cat']
   }, {
      id: 7,
      url: './images/memes/7.jpg',
      keywords: ['cute', 'kids', 'funny']
   }, {
      id: 8,
      url: './images/memes/8.jpg',
      keywords: ['men', 'celebrity']
   }, {
      id: 9,
      url: './images/memes/9.jpg',
      keywords: ['cute', 'cat', 'funny']
   }, {
      id: 10,
      url: './images/memes/10.jpg',
      keywords: ['men', 'celebrity', 'funny']
   }, {
      id: 11,
      url: './images/memes/11.jpg',
      keywords: ['men', 'celebrity']
   }, {
      id: 12,
      url: './images/memes/12.jpg',
      keywords: ['men', 'celebrity']
   }, {
      id: 13,
      url: './images/memes/13.jpg',
      keywords: ['men', 'celebrity']
   }, {
      id: 14,
      url: './images/memes/14.jpg',
      keywords: ['men', 'celebrity']
   }, {
      id: 15,
      url: './images/memes/15.jpg',
      keywords: ['men', 'celebrity']
   }, {
      id: 16,
      url: './images/memes/16.jpg',
      keywords: ['men', 'celebrity', 'funny']
   }, {
      id: 17,
      url: './images/memes/17.jpg',
      keywords: ['men', 'celebrity']
   }, {
      id: 18,
      url: './images/memes/18.jpg',
      keywords: ['funny', 'celebrity']
   }
];

function createKeywordsList() {
   const set = new Set()
   gImgs.forEach(img => img.keywords.forEach(keyword => set.add(keyword)));
   set.forEach(keyword => gKeywords.push({ name: keyword, searchCount: 0 }));
}

function renderKeywords() {
   let datalistHTMLs = '';
   let keywordsFilter = '';
   gKeywords.forEach(keyword => {
      datalistHTMLs += `<option value="${keyword.name}"></option>`
      keywordsFilter += `<button style="font-size: ${keyword.searchCount * 0.5 + 13}px;" onclick="onKeyword('${keyword.name}')">${keyword.name}</button>`
   })
   document.querySelector('#keywordsData').innerHTML = datalistHTMLs;
   document.querySelector('.filter-words-container').innerHTML = keywordsFilter;
}

function updateKeywordCount(keywordSearched) {
   const keywordObj = gKeywords.find(keyword => keyword.name === keywordSearched);
   if (!keywordObj || keywordObj.searchCount === 30) return;
   keywordObj.searchCount++;
}

function getImgsForDisplay(keyword) {
   if (!keyword) return gImgs;
   return gImgs.filter(img => {
      const regex = new RegExp('^' + keyword);
      return img.keywords.find(keyword => keyword.match(regex));
   });
}

