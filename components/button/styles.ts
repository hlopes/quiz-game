import styled from '@emotion/styled';

import { grey } from '@theme/colors';
import { shadow } from '@theme/styles';

export const StyledButton = styled.button`
    height: 3.6rem;
    padding: 0 1.6rem;
    font-size: 1.4rem;
    line-height: 3.6rem;
    letter-spacing: 0.05rem;
    text-align: center;
    text-transform: uppercase;
    border: none;
    border-radius: 0.2rem;
    cursor: pointer;
    transition: 0.3s ease-out;

    ${shadow}

    &:hover {
        background-color: ${grey};
    }
`;
