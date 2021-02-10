import React, { FC, useCallback } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';

import { Icon } from 'semantic-ui-react';

import useHydrationRender from '@helpers/useHydrationRender';
import { Media } from '@components/media/Media';
import Button from '@components/button';
import DarkModeToggle from '@components/dark-mode-toggle';

import { Nav, ButtonWrapper } from './styles';

import NavLink from './nav-link/NavLink';

const DesktopNavigation: FC = () => {
    const router = useRouter();

    const isHydrationRender = useHydrationRender();
    const [session] = useSession();

    const handleAuthLogin = useCallback(
        () =>
            !session
                ? signIn()
                : router.pathname !== '/account'
                ? router.push('/account')
                : () => {},
        [session, router]
    );

    return (
        <Media greaterThan="xs">
            <Nav>
                {!isHydrationRender ? (
                    <ButtonWrapper>
                        <Button onClick={handleAuthLogin}>
                            {session ? (
                                <Icon name="user" />
                            ) : (
                                <Icon name="user outline" />
                            )}
                            {session ? 'Account' : 'Login'}
                        </Button>
                    </ButtonWrapper>
                ) : null}
                <div>
                    <NavLink href={'/'}>Home</NavLink>
                    <NavLink href={'/about'}>About</NavLink>
                    {session && router.pathname !== '/game' && (
                        <NavLink href={'/game'}>New Game</NavLink>
                    )}
                </div>
                <DarkModeToggle />
            </Nav>
        </Media>
    );
};

export default DesktopNavigation;
