'use strict'


let gKeywords = [];
let gImgs = [
   {
      id: 1,
      keywords: ['men', 'celebrity']
   }, {
      id: 2,
      keywords: ['cute', 'animal']
   }, {
      id: 3,
      keywords: ['cute', 'kids', 'animal']
   }, {
      id: 4,
      keywords: ['cute', 'animal']
   }, {
      id: 5,
      keywords: ['cute', 'kids']
   }, {
      id: 6,
      keywords: ['men', 'cat']
   }, {
      id: 7,
      keywords: ['cute', 'kids', 'funny']
   }, {
      id: 8,
      keywords: ['men', 'celebrity']
   }, {
      id: 9,
      keywords: ['cute', 'cat', 'funny']
   }, {
      id: 10,
      keywords: ['men', 'celebrity', 'funny']
   }, {
      id: 11,
      keywords: ['men', 'celebrity']
   }, {
      id: 12,
      keywords: ['men', 'celebrity']
   }, {
      id: 13,
      keywords: ['men', 'celebrity']
   }, {
      id: 14,
      keywords: ['men', 'celebrity']
   }, {
      id: 15,
      keywords: ['men', 'celebrity']
   }, {
      id: 16,
      keywords: ['men', 'celebrity', 'funny']
   }, {
      id: 17,
      keywords: ['men', 'celebrity', 'crazy']
   }, {
      id: 18,
      keywords: ['funny', 'celebrity']
   }, {
      id: 19,
      keywords: ['funny', 'celebrity', 'crazy', 'men']
   }, {
      id: 20,
      keywords: ['calm', 'women']
   }, {
      id: 21,
      keywords: ['funny', 'celebrity', 'men']
   }, {
      id: 22,
      keywords: ['funny', 'animal']
   }, {
      id: 23,
      keywords: ['women', 'celebrity']
   }, {
      id: 24,
      keywords: ['men', 'celebrity', 'crazy']
   }, {
      id: 25,
      keywords: ['funny', 'kids']
   }
];

function createKeywordsList() {
   const set = new Set()
   gImgs.forEach(img => img.keywords.forEach(keyword => set.add(keyword)));
   set.forEach(keyword => gKeywords.push({ name: keyword, searchCount: 0 }));
}

function getKeywords() {
   return gKeywords;
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