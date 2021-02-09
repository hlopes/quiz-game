import styled from '@emotion/styled';

import { getNavLinkStyle, shadow } from '@theme/styles';

export const Nav = styled.nav`
    position: relative;
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

export const ButtonWrapper = styled.div`
    text-align: left;

    & Button:last-of-type {
        margin-left: 1rem;
    }
`;

export const StyledLink = styled.a`
    ${({ theme }) => getNavLinkStyle(theme)}
`;
