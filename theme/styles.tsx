import React from 'react';
import { ToastContainer } from 'react-toastify';

import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';

import normalize from './normalize';
import variables from './variables';
import semanticOverride from './semantic-ui-overrides';
import { black, grey, white, red } from './colors';

export const globalStyles = (
    <Global
        styles={css`
            ${normalize}
            ${variables}
            ${semanticOverride}

            *,
            *::before,
            *::after {
                box-sizing: border-box;
            }

            html {
                /**
                 * Font size 10px on default browser settings.
                 * It's used as 62.5% to adapt to changes in the browser's default font-size.
                 */
                font-size: 62.5%;
            }

            body {
                min-height: 100%;
                overflow-x: hidden;
                font-size: 1.6rem;
                font-family: Helvetica, Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
            }

            body,
            #root {
                display: flex;
                flex: 1 0 auto;
                flex-direction: column;
            }

            #root {
                min-height: 100%;
            }

            p {
                font-size: 1.6rem;
            }
        `}
    />
);

export const shadow = css`
    box-shadow: 0 0.2rem 0.2rem 0 rgba(0, 0, 0, 0.14),
        0 0.3rem 0.1rem -0.2rem rgba(0, 0, 0, 0.12),
        0 0.1rem 0.5rem 0 rgba(0, 0, 0, 0.2);
`;

export const Section = styled.section`
    padding: 1rem;
`;

export const Button = styled.button`
    height: 3.6rem;
    padding: 0 16px;
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

export const Error = styled.p`
    margin: 0 0 1rem;
    color: ${red};
    font-size: 1rem;
    text-align: left;
`;

export const StyledToastContainer = styled(ToastContainer)`
    .Toastify__toast {
        color: ${white};
    }
`;

export const LIGHT_THEME = {
    bg: {
        primary: '#fff',
        secondary: '#ffffff',
        inset: '#e2e4e8',
        input: 'rgba(65,67,78,0.12)',
    },
    text: {
        primary: '#050505',
        secondary: '#2f3037',
        tertiary: '#525560',
        placeholder: 'rgba(82,85,96,0.5)',
        onPrimary: '#ffffff',
    },
};

export const DARK_THEME = {
    bg: {
        primary: '#050505',
        secondary: '#111111',
        inset: '#111111',
        input: 'rgba(191,193,201,0.12)',
    },
    text: {
        primary: '#fbfbfc',
        secondary: '#e3e4e8',
        tertiary: '#a9abb6',
        placeholder: 'rgba(145,148,161,0.5)',
        onPrimary: '#050505',
    },
};

export const getNavLinkStyle = (theme) => {
    return css`
        display: inline-block;
        padding: 0 1.5rem;
        color: ${theme.text?.primary};
        font-size: 1.4rem;
        text-decoration: none;
        transition: background-color 0.3s;

        &:hover,
        &:active {
            color: ${black};
            background-color: ${grey};
        }
    `;
};
