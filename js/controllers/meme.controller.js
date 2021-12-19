'use strict'

let gCanvas;
let gCtx;
let gStartPos;
const gTouchEvs = ['touchmove', 'tuochend', 'touchstart'];
const gStickers = ['💙', '😂', '😎', '😍', '👌🏼', '🤙🏼', '💪🏼', '👄']
let gStickersIdx = 0;
let gAspectRatio=1;


function initMeme(imgId) {
   gCanvas = document.querySelector('#my-canvas');
   setCanvasHeight(imgId);
   gCtx = gCanvas.getContext('2d');
   addMouseListeners();
   addTouchListeners();
   renderStickers()
   setImg(imgId);
   onLoadMeme()
   resizeCanvas();
   window.addEventListener('resize', () => resizeCanvas());
}

function setCanvasHeight(imgId) {
   const elTestImg = document.querySelector('.test-img');
   elTestImg.style.display = 'inline'
   if (imgId) {
      const imgSrc = getElImgById(imgId).src;
      elTestImg.src = imgSrc;
   }
   const imgWidth = elTestImg.offsetWidth;
   const imgHeight = elTestImg.offsetHeight;
   const CanvasHeight = (imgHeight * 500) / imgWidth;
   gCanvas.height = CanvasHeight;
   elTestImg.style.display = 'none';
   gAspectRatio=imgWidth/imgHeight;
}

function addMouseListeners() {
   gCanvas.addEventListener('mousemove', onMove)
   gCanvas.addEventListener('mousedown', onDown)
   gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
   gCanvas.addEventListener('touchmove', onMove)
   gCanvas.addEventListener('touchstart', onDown)
   gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
   const pos = getEvPos(ev);
   const clickedLineIdx = isLineClicked(pos);
   if (clickedLineIdx < 0) {
      switchLine(clickedLineIdx);
      renderMeme();
      return;
   }
   switchLine(clickedLineIdx);
   setLineDrag(true);
   gStartPos = pos;
   gCanvas.style.cursor = 'grabbing'
   renderMeme();
}

function onMove(ev) {
   const line = getSelectedLine();
   if (!line || !line.isDrag) return;
   const pos = getEvPos(ev);
   const dx = pos.x - gStartPos.x;
   const dy = pos.y - gStartPos.y;
   moveLine(dx, dy);
   gStartPos = pos;
   renderMeme();
}

function onUp() {
   setLineDrag(false);
   gCanvas.style.cursor = 'grab'
   // document.querySelector('input[name="txt"]').focus();
}

function onLoadMeme() {
   const meme = getMeme();
   const image = new Image()
   image.src = `./images/memes/${meme.selectedImgId}.jpg`
   image.onload = () => {
      renderMeme()
   }
}
function renderMeme() {
   const meme = getMeme();
   let elImg = getElImgById(meme.selectedImgId)
   if (!meme.selectedImgId) elImg = document.querySelector('.test-img')
   gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
   if (meme.lines.length) {
      meme.lines.forEach((line, i) => {
         drawLine(line);
         if (i === meme.selectedLineIdx && meme.selectedLineIdx >= 0) markSelectedLine(meme.lines[meme.selectedLineIdx]);
      })
   }
   // gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
   /*   elImg.onload = () => {
        console.log('hi');
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
     }; */
   // if (meme.lines.length) {
   //    meme.lines.forEach((line, i) => {
   //       drawLine(line);
   //       if (i === meme.selectedLineIdx && meme.selectedLineIdx >= 0) markSelectedLine(meme.lines[meme.selectedLineIdx]);
   //    })
   // }
}

function drawLine({ pos: { x, y }, txt, size, fontFam, fillC, strokeC, align }) {
   gCtx.textBaseline = 'middle';
   gCtx.textAlign = align;
   gCtx.lineWidth = 1;
   gCtx.strokeStyle = strokeC;
   gCtx.font = `${size}px ${fontFam}`;
   gCtx.fillStyle = fillC;
   gCtx.fillText(txt, x, y);
   gCtx.strokeText(txt, x, y);
}

function markSelectedLine(line) {
   const { pos: { x, y }, align, size, txt } = line;
   const lineHeight = size + 20;
   const lineWidth = gCtx.measureText(txt).width;
   gCtx.beginPath();
   if (align === 'start') {
      gCtx.rect(x, y - (lineHeight / 2), lineWidth, lineHeight);
   } else if (align === 'center') {
      gCtx.rect(x - (lineWidth / 2), y - (lineHeight / 2), lineWidth, lineHeight);
   } else if (align === 'end') {
      gCtx.rect(x - lineWidth, y - (lineHeight / 2), lineWidth, lineHeight);
   }
   gCtx.lineWidth = 2;
   gCtx.strokeStyle = 'rgb(15,155,180)';
   gCtx.stroke();
   gCtx.closePath();
   renderLineValues(line);
}

function renderLineValues(line) {
   const propsToIgnore = ['size', 'align', 'pos', 'isDrag']
   console.log(line);
   Object.keys(line).forEach((prop) => {
      if (!propsToIgnore.includes(prop)) {
         console.log(prop);
      document.querySelector(`.tools-bar [name="${prop}"]`).value = line[prop];
      }
   })
   // for (let prop in line) {
   //    if (propsToIgnore.includes(prop)) continue;
   //    document.querySelector(`.tools-bar [name="${prop}"]`).value = line[prop];
   // }
}

function onSetText(txt) {
   setLineTxt(txt);
   renderMeme();
}

function onSetColor(color, part) {
   setColor(color, part);
   renderMeme();
}

function onSetFontSize(diff) {
   setFontSize(+diff);
   renderMeme();
}

function onSwitchLine() {
   switchLine();
   renderMeme();
   document.querySelector('input[name="txt"]').focus();
}

function onSetFontFam(fontFam) {
   setFontFam(fontFam);
   renderMeme();
}

function onSetAlign(align) {
   setAlign(align);
   renderMeme();
}

function onAddLine() {
   addLine();
   renderMeme();
}

function onDeleteLine() {
   deleteLine();
   renderMeme();
}

function renderStickers() {
   let strHTMLs = '';
   for (var i = gStickersIdx; i < gStickersIdx + 4; i++) {
      strHTMLs += `<button class="sticker" onclick="onStickerClick('${gStickers[i]}')">${gStickers[i]}</button>`
   }
   document.querySelector('.stickers-display').innerHTML = strHTMLs;
}

function onScrollStickers(diff) {
   const stickersIdx = gStickersIdx + diff;
   if (stickersIdx < 0) gStickersIdx = gStickers.length - 4;
   else if (stickersIdx > (gStickers.length - 4)) gStickersIdx = 0;
   else gStickersIdx = stickersIdx;
   renderStickers();
}

function onStickerClick(sticker) {
   addLine(sticker);
   renderMeme();
}

function onDownloadMeme(elLink) {
   switchLine(-1);
   renderMeme();
   const data = gCanvas.toDataURL();
   elLink.href = data;
   elLink.download = 'my-meme.jpg';
}

function onUploadMeme() {
   switchLine(-1);
   renderMeme();
   uploadMeme();
}

function onSaveMeme() {
   switchLine(-1);
   renderMeme();
   const MemeData = gCanvas.toDataURL();
   saveMeme(MemeData);
   navigateTo('saved');
   renderSaved();
}

function getElImgById(imgId) {
   return document.querySelector(`[src="./images/memes/${imgId}.jpg"]`)
}

function getEvPos(ev) {
   var pos = {
      x: ev.offsetX,
      y: ev.offsetY
   }
   if (gTouchEvs.includes(ev.type)) {
      ev.preventDefault()
      var rect = ev.target.getBoundingClientRect();
      var x = ev.targetTouches[0].pageX - rect.left;
      var y = ev.targetTouches[0].pageY - rect.top;
      pos = { x, y }
   }
   return pos
}

function resizeCanvas() {
   var elContainer = document.querySelector('.canvas-container');
   // const fontSizing=(gCanvas.width<elContainer.offsetWidth)?growFont:shrinkFont;
   gCanvas.width = elContainer.offsetWidth;
   gCanvas.height = gCanvas.width/gAspectRatio;
   setLinesPos(gCanvas.width/2)
   // gAspectRatio=gCanvas.width/gCanvas.height
   // setFontResize(fontSizing,gAspectRatio);
   renderMeme();
}