import React, { FC } from 'react';
import styled from '@emotion/styled';

import { Theme } from '../../../theme/styles';

type ThemeProp = {
    theme?: Theme;
};

const StyledFooter = styled.footer<ThemeProp>`
    padding: 1rem;
    color: ${({ theme }: ThemeProp) => `${theme.text.primary} !important`};
    font-weight: bold;
    text-align: right;
`;

const Footer: FC = () => <StyledFooter>Copyright 2021 Hlopes</StyledFooter>;

export default Footer;
