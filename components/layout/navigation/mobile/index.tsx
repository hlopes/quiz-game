import React, { FC, useCallback, useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession, signout, signIn } from 'next-auth/client';

import useHydrationRender from '@helpers/useHydrationRender';
import { Media } from '@components/media/Media';
import DarkModeToggle from '@components/dark-mode-toggle';
import { Button } from '@theme/styles';

import { Icon } from 'semantic-ui-react';

import { ButtonWrapper } from '@components/layout/navigation/desktop/styles';

import Burger from './burger-icon';

import { Header, Nav, Overlay } from './styles';

const MobileNavigation: FC = () => {
    const router = useRouter();
    const [session] = useSession();
    const isHydrationRender = useHydrationRender();

    const burgerRef = useRef(null);
    const sideMenuRef = useRef(null);

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    const handleAuthLogin = useCallback(
        () =>
            !session
                ? signIn()
                : router.pathname !== '/account'
                ? router.push('/account')
                : () => {},
        [session, router]
    );

    const logoutAction = useCallback(() => {
        signout();
    }, []);

    const toggleSideMenu = useCallback(() => {
        setIsSideMenuOpen(!isSideMenuOpen);
    }, [isSideMenuOpen]);

    const handleClick = useCallback((e) => {
        if (
            sideMenuRef.current?.contains(e.target) ||
            burgerRef.current?.contains(e.target)
        ) {
            return;
        }

        setIsSideMenuOpen(false);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isSideMenuOpen ? 'hidden' : 'auto';
    }, [isSideMenuOpen]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Media at="xs">
            <Header>
                <Burger
                    ref={burgerRef}
                    isOpen={isSideMenuOpen}
                    onOpen={toggleSideMenu}
                />
                <DarkModeToggle />
            </Header>
            <Overlay isOpen={isSideMenuOpen} />
            <Nav ref={sideMenuRef} isOpen={isSideMenuOpen}>
                <ul>
                    {!isHydrationRender ? (
                        <li>
                            <Button onClick={handleAuthLogin}>
                                {session ? (
                                    <Icon name="user" />
                                ) : (
                                    <Icon name="user outline" />
                                )}
                                {session ? 'Account' : 'Login'}
                            </Button>
                        </li>
                    ) : null}
                    <li>
                        <Link href={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link href={'/about'}>About</Link>
                    </li>
                    {session && router.pathname !== '/game' && (
                        <li>
                            <Link href={'/game'}>New Game</Link>
                        </li>
                    )}
                </ul>
                <div>
                    {isHydrationRender && session && (
                        <Button onClick={logoutAction}>Logout</Button>
                    )}
                </div>
            </Nav>
        </Media>
    );
};

export default MobileNavigation;
