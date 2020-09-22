import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';

import useUserContext from '../hooks/useUserContext';

import styles from '../styles/Home.module.css';

import Header from './header/Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    const router = useRouter();
    const { dispatch } = useUserContext();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({ type: 'USER', payload: user });

            router.push('/');
        } else {
            router.push('/login');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.any,
};

export default Layout;
