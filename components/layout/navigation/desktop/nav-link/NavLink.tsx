import React, { FC } from 'react';

import Link from 'next/link';

import { StyledLink } from '../styles';

type Props = {
    href: string;
    children?: string;
};

const NavLink: FC<Props> = ({ href, children }: Props) => (
    <Link href={href} passHref>
        <StyledLink>{children}</StyledLink>
    </Link>
);

export default NavLink;
