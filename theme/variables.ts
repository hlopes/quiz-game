import { css } from '@emotion/react';

import { h1, h3 } from './typography';

export const headerHeightMobile = '4.8rem';
export const headerHeightDesktop = '6.4rem';

export default css`
    :root {
        --viewport-height: 100vh;
        --viewport-width: 100vw;

        --header-height: ${headerHeightMobile};
        --header-height-desktop: ${headerHeightDesktop};
    }
`;
