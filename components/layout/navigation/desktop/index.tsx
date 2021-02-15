import React, { FC } from 'react';
import { useRouter } from 'next/router';

import usePlayerContext from '@helpers/usePlayerContext';
import useHydrationRender from '@helpers/useHydrationRender';
import { Media } from '@components/media/Media';
import DarkModeToggle from '@components/dark-mode-toggle';

import { Nav } from './styles';

import NavLink from './nav-link/NavLink';

const DesktopNavigation: FC = () => {
    const router = useRouter();
    const isHydrationRender = useHydrationRender();
    const { data } = usePlayerContext();

    return (
        <Media greaterThan="xs">
            <Nav>
                {!isHydrationRender ? (
                    data?.player ? (
                        <NavLink href={'/account'}>🔓 Account</NavLink>
                    ) : (
                        <NavLink href={'/signin'}>🔐 Enter Game</NavLink>
                    )
                ) : null}
                <div>
                    <NavLink href={'/'}>Home</NavLink>
                    <NavLink href={'/about'}>About</NavLink>
                    {data?.player && router.pathname !== '/game' && (
                        <NavLink href={'/game'}>New Game</NavLink>
                    )}
                </div>
                <DarkModeToggle />
            </Nav>
        </Media>
    );
};

export default DesktopNavigation;
