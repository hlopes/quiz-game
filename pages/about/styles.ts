import styled from '@emotion/styled';

import { Segment } from 'semantic-ui-react';

export const StyledSegment = styled(Segment)`
    text-align: left;

    img {
        width: 100%;
    }

    ul {
        list-style-type: none;
    }

    ul a {
        display: inline-block;
        padding: 1.1rem 0;
    }
`;
