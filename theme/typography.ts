import { css } from '@emotion/react';

import * as colors from './colors';

export const h1 = css`
    font-size: 2.4rem;
    line-height: 1.35;
    letter-spacing: 0;
`;

export const h2 = css`
    font-size: 2.4rem;
    line-height: 1.35;
    letter-spacing: 0;
`;

export const h3 = css`
    font-size: 1.6rem;
    line-height: 1.35;
    letter-spacing: 0.08rem;
    text-transform: uppercase;
`;

export const p = css`
    font-size: 1.6rem;
    line-height: 1.35;
    letter-spacing: 0;
`;

export const small = css`
    font-size: 1.2rem;
    line-height: 1.35;
    letter-spacing: 0;
`;

export const label = css`
    color: ${colors.black};
    font-size: 1rem;
    line-height: 1.35;
    text-transform: capitalize;
`;

export const textLink = css`
    color: ${colors.red};
    font-size: 1.6rem;
    line-height: 1.35;
    letter-spacing: 0;
    text-decoration: underline;
    text-underline-position: under;
`;
