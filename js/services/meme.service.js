'use strict'

let isSecLine = true;
let gMeme = {
   selectedImgId: 5,
   selectedLineIdx: 0,
   lines: [{
      txt: 'Insert Your text here...',
      size: 40,
      align: 'center',
      pos: {
         x: 250,
         y: 50
      },
      fontFam: 'impact',
      fillC: '#ffffff',
      strokeC: '#000000',
      isDrag: false
   }]
}

function getMeme() {
   return gMeme;
}

function setImg(imgId) {
   gMeme.selectedImgId = imgId;
}

function setLineTxt(txt) {
   if (gMeme.selectedLineIdx < 0) return;
   gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function setColor(color, part) {
   if (gMeme.selectedLineIdx < 0) return;
   gMeme.lines[gMeme.selectedLineIdx][part] = color;
}

function setFontSize(diff) {
   if (gMeme.selectedLineIdx < 0) return;
   if ((gMeme.lines[gMeme.selectedLineIdx].size + diff) === 5 ||
      (gMeme.lines[gMeme.selectedLineIdx].size + diff) === 100) return;
   gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function switchLine(lineIdx) {
   if (lineIdx || lineIdx === 0) gMeme.selectedLineIdx = lineIdx;
   else gMeme.selectedLineIdx = (gMeme.selectedLineIdx === (gMeme.lines.length - 1)) ? 0 : gMeme.selectedLineIdx + 1;
}

function setFontFam(fontFam) {
   if (gMeme.selectedLineIdx < 0) return;
   gMeme.lines[gMeme.selectedLineIdx].fontFam = fontFam;
}

function setAlign(align) {
   if (gMeme.selectedLineIdx < 0) return;
   gMeme.lines[gMeme.selectedLineIdx].align = align;
   let x;
   if (align === 'start') x = 10;
   else if (align === 'center') x = gCanvas.width / 2;
   else if (align === 'end') x = gCanvas.width - 10;
   gMeme.lines[gMeme.selectedLineIdx].pos.x = x;
}

function addLine(txt = '*meme text*') {
   const line = {
      txt,
      size: 40,
      align: 'center',
      pos: {
         x: gCanvas.width / 2,
         y: gCanvas.height / 2
      },
      fontFam: 'impact',
      fillC: '#ffffff',
      strokeC: '#000000',
      isDrag: false
   }
   if (isSecLine) line.pos.y = gCanvas.height - 50;
   isSecLine = false;
   gMeme.lines.push(line);
   switchLine(gMeme.lines.length - 1);
}

function deleteLine() {
   if (gMeme.selectedLineIdx < 0) return;
   if (!gMeme.lines[gMeme.selectedLineIdx]) return;
   gMeme.lines.splice(gMeme.selectedLineIdx, 1);
   gMeme.selectedLineIdx = 0;
}

function isLineClicked(pos) {
   return gMeme.lines.findIndex(line => {
      const x = line.pos.x;
      const y = line.pos.y;
      const lineHeight = line.size + 20;
      const lineWidth = gCtx.measureText(line.txt).width;;
      // console.log('pos.x', pos.x);
      // console.log('pos.y', pos.y);
      // console.log('x', x);
      // console.log('y', y);
      // console.log('lineHeight', lineHeight);
      // console.log('lineWidth', lineWidth);
      // console.log(pos.y < (y - (lineHeight / 2)) + lineHeight);
      if (line.align === 'start') {
         return (pos.x > x &&
            pos.y > (y - (lineHeight / 2)) &&
            pos.x < x + lineWidth &&
            pos.y < (y - (lineHeight / 2)) + lineHeight);
      } else if (line.align === 'center') {
         return (pos.x > x - (lineWidth / 2) &&
            pos.y > (y - (lineHeight / 2)) &&
            pos.x < x - (lineWidth / 2) + lineWidth &&
            pos.y < (y - (lineHeight / 2)) + lineHeight);
      } else if (line.align === 'end') {
         return (pos.x > x - lineWidth &&
            pos.y > y - (lineHeight / 2) &&
            pos.x < x + lineWidth &&
            pos.y < (y - (lineHeight / 2)) + lineHeight);
      }
   })
}

function setLineDrag(isDrag) {
   if (gMeme.selectedLineIdx < 0) return;
   gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag;
}

function getLine() {
   if (gMeme.selectedLineIdx < 0) return false;
   return gMeme.lines[gMeme.selectedLineIdx];
}

function moveLine(dx, dy) {
   gMeme.lines[gMeme.selectedLineIdx].pos.x += dx;
   gMeme.lines[gMeme.selectedLineIdx].pos.y += dy;
}