import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { Container, Menu } from 'semantic-ui-react';

import styles from './Header.module.css';

const Header = () => {
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
            <Menu fixed="top" inverted>
                <Container>
                    <Menu.Item>
                        <Link href={'/'}>Home</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href={'/login'}>Login</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href={'/register'}>Register</Link>
                    </Menu.Item>
                </Container>
            </Menu>
        </header>
    );
};

export default Header;
