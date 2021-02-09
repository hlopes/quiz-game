import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { burger } from '@theme/layers';

export type BaseProps = {
    isOpen: boolean;
};

const getCommonSpinnerStyle = (theme) => css`
    box-sizing: border-box;
    width: 100%;
    height: 0.3rem;
    background-color: ${theme.text.primary};
    transition: all 0.3s;
`;

export const Icon = styled.div`
    position: absolute;
    top: 50%;
    left: 1.5rem;
    z-index: ${burger};
    box-sizing: border-box;
    width: 2.2rem;
    transform: translateY(-50%);
    cursor: pointer;
    transition: all 0.3s;
`;

export const Horizontal = styled.div<BaseProps>`
    ${({ theme }) => getCommonSpinnerStyle(theme)};

    position: relative;
    float: left;
    margin-top: 0.3rem;
    opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
`;

export const DiagonalPart1 = styled.div<BaseProps>`
    ${({ theme }) => getCommonSpinnerStyle(theme)};

    position: relative;
    float: left;
    margin-top: ${({ isOpen }) => (isOpen ? '0.8rem' : '0')};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(135deg)' : 'rotate(0)')};
`;

export const DiagonalPart2 = styled.div<BaseProps>`
    ${({ theme }) => getCommonSpinnerStyle(theme)};

    position: relative;
    float: left;
    margin-top: ${({ isOpen }) => (isOpen ? '-0.9rem' : '0.3rem')};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-135deg)' : 'rotate(0)')};
`;
