import styled from '@emotion/styled';

import { getNavLinkStyle, shadow } from '@theme/styles';
import { nav } from '@theme/layers';

export const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${nav};
    display: flex;
    align-items: center;
    width: 100%;
    height: 6.4rem;
    padding: 1rem;
    color: ${({ theme }: { theme: any }) => theme.text?.primary};
    line-height: 6.4rem;
    background-color: ${({ theme }: { theme: any }) => theme.bg?.primary};

    ${shadow}

    > div {
        flex: 1 0;
    }
`;

export const StyledLink = styled.a`
    ${({ theme }) => getNavLinkStyle(theme)}
`;
