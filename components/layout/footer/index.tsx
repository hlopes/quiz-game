import React, { FC } from 'react';
import styled from '@emotion/styled';

const StyledFooter = styled.footer`
    padding: 1rem;
    color: ${({ theme }) => `${theme.text.primary} !important`};
    font-weight: bold;
    text-align: right;
`;

const Footer: FC = () => <StyledFooter>Copyright 2021 Hlopes</StyledFooter>;

export default Footer;
