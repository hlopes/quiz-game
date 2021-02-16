import styled from '@emotion/styled';

import { black } from '@theme/colors';
import { getNavLinkStyle, shadow } from '@theme/styles';
import { above, background, nav } from '@theme/layers';

export const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${nav};
    width: 100%;
    height: var(--header-height);
    color: ${({ theme }: { theme: any }) => theme.text?.primary};
    background-color: ${({ theme }: { theme: any }) => theme.bg?.primary};
`;

export const Nav = styled.nav<{ isOpen: boolean }>`
    ${shadow};

    position: fixed;
    top: 0;
    left: 0;
    z-index: ${above};
    width: 30rem;
    height: calc(100% + 6rem);
    margin: 0;
    padding: var(--header-height) 0 6rem 0;
    overflow-y: auto;
    color: ${({ theme }: { theme: any }) => theme.text?.primary};
    background-color: ${({ theme }: { theme: any }) => theme.bg?.primary};
    transform: ${({ isOpen }: { theme: any; isOpen: boolean }) =>
        isOpen ? 'translateX(0)' : 'translateX(-100vw)'};
    transition: transform 0.5s ease, opacity ease 0.2s;
    will-change: transform;

    ul {
        margin: 0;
        padding: 0;
    }

    li {
        list-style: none;

        a {
            ${({ theme }) => getNavLinkStyle(theme)}

            display: block;
            padding: 1.6rem;
        }
    }
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: ${({ isOpen }: { theme?: any; isOpen: boolean }) =>
        isOpen ? above : background};
    background-color: ${black};
    opacity: ${({ isOpen }: { theme?: any; isOpen: boolean }) =>
        isOpen ? 0.5 : 0};
    transition: opacity ease 1s;
`;
