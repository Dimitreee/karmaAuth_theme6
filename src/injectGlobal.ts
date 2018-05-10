import { injectGlobal } from 'styled-components';
const sanitize = require('sanitize.css');

export default function injectGlobalStyles() {
  return injectGlobal`
    ${sanitize}
    
    body {
        font-family: sans-serif;
        background: #242121;
    }

    * {
        line-height: 140%;
        color: #fff;
    }

    a:visited, a:link {
        color: #447e9b;
        text-decoration: none;
        cursor: pointer;
    }

    a:focus, a:hover {
        color: #036;
    }
    
    canvas {
      display: none;
    }
    `;
}
