'use strict'

let gCanvas;
let gCtx;
let gStartPos;
const gTouchEvs = ['touchmove', 'tuochend', 'touchstart'];

function initMeme(imgId) {
   gCanvas = document.querySelector('#my-canvas');
   gCtx = gCanvas.getContext('2d');
   addMouseListeners();
   addTouchListeners();
   setImg(imgId);
   renderMeme();
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
   if (clickedLineIdx < 0) return;
   switchLine(clickedLineIdx);
   setLineDrag(true);
   gStartPos = pos;
   gCanvas.style.cursor = 'grabbing'
   renderMeme();
}

function onMove(ev) {
   const line = getLine();
   if (!line.isDrag) return;
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
}

function renderMeme() {
   const meme = getMeme();
   const elImg = getElImgById(meme.selectedImgId)
   gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
   if (meme.lines.length) {
      meme.lines.forEach(line => drawLine(line))
      markSelectedLine(meme.lines[meme.selectedLineIdx]);
   }
}

function markSelectedLine(line) {
   const x = line.pos.x;
   const y = line.pos.y;
   const lineHeight = line.size + 20;
   const lineWidth = gCtx.measureText(line.txt).width * (line.size / 40);
   gCtx.beginPath();
   if (line.align === 'start') {
      gCtx.rect(x, y - (lineHeight / 2), lineWidth, lineHeight);
   } else if (line.align === 'center') {
      gCtx.rect(x - (lineWidth / 2), y - (lineHeight / 2), lineWidth, lineHeight);
   } else if (line.align === 'end') {
      gCtx.rect(x - lineWidth, y - (lineHeight / 2), lineWidth, lineHeight);
   }
   gCtx.lineWidth = 2;
   gCtx.strokeStyle = 'rgb(15,155,180)';
   gCtx.stroke();
   gCtx.closePath();
   renderLineValues(line);
}

function renderLineValues(line) {
   for (let sett in line) {
      if (sett === 'size' || sett === 'align' || sett === 'pos' || sett === 'isDrag') continue;
      document.querySelector(`.tools-bar [name="${sett}"]`).value = line[sett];
   }
}

function onClickCanvas(ev) {
   const { offsetX, offsetY } = getEvPos(ev);
   const meme = getMeme();
   const lineIdx = meme.lines.findIndex(line => {
      const y = line.pos.y;
      const lineHeight = line.size + 20;
      return ((y - (lineHeight / 2)) < offsetY &&
         (y + (lineHeight / 2)) > offsetY)
   })
   if (lineIdx < 0) return;
   switchLine(lineIdx);
   renderMeme();
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
   document.focus = document.querySelector('input[name="txt"]')
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

function drawLine(line) {
   const x = line.pos.x;
   const y = line.pos.y;
   gCtx.textBaseline = 'middle';
   gCtx.textAlign = line.align;
   gCtx.lineWidth = 1;
   gCtx.strokeStyle = line.strokeC;
   gCtx.font = `${line.size}px ${line.fontFam}`;
   gCtx.fillStyle = line.fillC;
   gCtx.fillText(line.txt, x, y);
   gCtx.strokeText(line.txt, x, y);
}

function onDownloadMeme(elLink) {
   const data = gCanvas.toDataURL()
   elLink.href = data
   elLink.download = 'my-meme.jpg'
}

function onUploadMeme() {
   uploadMeme();
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