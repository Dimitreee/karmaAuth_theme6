import * as React from 'react';

export const LibraryAddIcon = ({
  width = 24,
  height = 24,
  fill = 'none',
  scale = 0
} = {}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} transform={`scale(${scale})`}>
    <path d="M0 0h24v24H0z" fill={fill} />
    <path
      d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0
     1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1
      9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"
    />
  </svg>
);
