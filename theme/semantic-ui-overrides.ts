import { css } from '@emotion/react';

import { h1, h3 } from './typography';

export default css`
    :root {
        .ui {
            font-size: 1.6rem;
        }

        h1.ui.header {
            ${h1}
        }

        h3,
        h3.ui.header {
            ${h3}
        }

        .ui.table {
            margin: 0 auto;
        }

        .ui.big.button {
            font-size: 1.6rem;
            text-transform: uppercase;
        }
    }
`;
