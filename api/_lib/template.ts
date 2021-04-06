
import { readFileSync } from 'fs';
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');
const rglr = readFileSync(`${__dirname}/../_fonts/Roboto-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Roboto-Bold.woff2`).toString('base64');

function getCss(theme: string, fontSize: string) {
    let background = '#E4B418';
    let title = '#262626';
    let bgTitle = 'none';
    let text = 'rgba(0,0,0,.75)'

    if (theme === 'dark') {
        background = '#4A6B7B';
        title = '#262626';
        bgTitle = '#E4B418';
        text = 'rgba(255,255,255,.75)'
    }
    return `
    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }
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
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        align-content: center;
    }

    code {
        color: ${text};
        font-family: ${mono};
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
    }

    svg {
        color: ${text};
    }

    .title-wrapper {
      font-size: ${sanitizeHtml(fontSize)};
      display: flex;
      flex-direction: column;
      align-items: center;
      align-content: center;
      justify-content: center;
    }

    .logo {
        margin: 0 16px;
    }

    .plus {
        color: ${text};
        font-family: 'Roboto', sans-serif;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .heading {
        font-family: 'Roboto', sans-serif;
        font-weight: normal;
        color: ${title};
        background: ${bgTitle};
        padding: 10px 20px;
        line-height: 120%;
        max-width: 50vw;
        margin: 20px 0;
        font-size: 1em;
    }

    .heading p {
      margin: 0;
      padding: 0;
    }

    .attribution {
        font-family: 'Roboto', sans-serif;
        font-size: .35em;
        font-weight: normal;
        color: ${text};
        line-height: 150%;
        font-size: .5em;
    }

    .attribution small {
      font-size: .75em;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, md, images, fontSize, widths, heights } = parsedReq;
    return `<html>
        <meta charset="utf-8">
        <title>Generated Image</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          ${getCss(theme, fontSize)}
        </style>
        <body>
            <div>
                <div class="logo-wrapper">
                ${images.map((img, i) =>
                    getPlusSign(i) + getImage(img, widths[i], heights[i])
                ).join('')}
            </div>
            <div class="title-wrapper">
            <div class="heading">${emojify(
                md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
            <div class="attribution">
              eduardoaguayo.cl<br><small>Ilustración: Daily PM</small>
            </div>
            </div>
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

function getPlusSign(i: number) {
    return i === 0 ? '' : '<div class="plus">+</div>';
}
