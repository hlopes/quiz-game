import React from 'react';
import Head from 'next/head';

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
        </header>
    );
};

export default Header;
