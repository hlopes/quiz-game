import styled from '@emotion/styled';

import { gteSmallMedia } from '@theme/custom-media';

export const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    right: 0;
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;
    transform: translateY(-50%);

    & > button {
        color: #ffe600;
        font-size: 1.2em;
        background: none;
        border: none;
        cursor: pointer;
        transition: color 0.3s ease;

        &:last-child {
            color: #666;
        }

        &:focus {
            outline: none;
        }
    }

    ${gteSmallMedia} {
        position: static;
    }
`;
