
import { readFileSync } from 'fs';
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Roboto-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Roboto-Bold.woff2`).toString('base64');

function getCss(theme: string, fontSize: string) {
    let background = '#00A79D';
    let title = '#f1f2f2';
    let text = '#f1f2f2';
    let direction = 'row'

    if (theme === 'dark') {
        background = '#EC008C';
        title = '#f1f2f2';
        text = '#f1f2f2';
        let direction = 'row-reverse'
    }
    return `
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr})  format("woff2");
      }
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold})  format("woff2");
      }

    body {
        background: ${background};
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: space-between;
        flex-direction: ${direction};
        padding: 80px;
    }

    .title-wrapper {
      font-size: ${sanitizeHtml(fontSize)};
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      width: 50vw;
      height: 460px;
    }

    .heading {
      font-family: 'Roboto', sans-serif;
      color: ${title};
      line-height: 120%;
      text-align: left;
      font-weight: normal;
    }

    svg {
        fill: ${text};
    }

    .img-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
        justify-content: center;
        font-family: 'Roboto', sans-serif;
        color: ${text};
        font-size: 14px;
        max-height: 460px;
    }

    .img-wrapper img, .img-wrapper p {margin: 0; padding: 0;}
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, md, images, fontSize, widths, heights } = parsedReq;
    return `<html>
        <meta charset="utf-8">
        <title>Edu's Generated Image</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          ${getCss(theme, fontSize)}
        </style>
        <body>
        <div class="title-wrapper">
          <div class="heading">${emojify(
              md ? marked(text) : sanitizeHtml(text)
          )}</div>
          <img src="https://eduardoaguayo.cl/assets/brand/logotipo-vertical-responsive.svg" width="100">
        </div>
        <div class="img-wrapper">
        ${images.map((img, i) =>
            getImage(img, widths[i], heights[i])
        ).join('')}
          <p>Daily PM - Noun Project</p>
        </div>
    </body>
</html>`;
}

function getImage(src: string, width ='auto', height = '200') {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}
