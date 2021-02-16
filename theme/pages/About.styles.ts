import styled from '@emotion/styled';

import { StyledSegment as BaseSegment } from '@theme/styles';

export const StyledSegment = styled(BaseSegment)`
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
