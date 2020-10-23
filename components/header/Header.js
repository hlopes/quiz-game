import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { Container, Icon, Menu } from 'semantic-ui-react';

import useUserContext from '../../hooks/useUserContext';

const Header = () => {
    const { state } = useUserContext();

    return (
        <header>
            <Head>
                <title>Quiz Game</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"
                />
            </Head>
            {/*<Menu fixed="top" inverted>*/}
            {/*    <Container>*/}
            {/*        <Menu.Item>*/}
            {/*            <Link href={'/'}>Home</Link>*/}
            {/*        </Menu.Item>*/}
            {/*        {!state?.email && (*/}
            {/*            <>*/}
            {/*                <Menu.Item>*/}
            {/*                    <Link href={'/login'}>*/}
            {/*                        <Icon name="user circle outline" />*/}
            {/*                    </Link>*/}
            {/*                </Menu.Item>*/}
            {/*                <Menu.Item>*/}
            {/*                    <Link href={'/register'}>Register</Link>*/}
            {/*                </Menu.Item>*/}
            {/*            </>*/}
            {/*        )}*/}
            {/*    </Container>*/}
            {/*</Menu>*/}
        </header>
    );
};

export default Header;
