import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Home.module.css';

import Header from './header/Header';
import Footer from './Footer';

const Layout = ({ children }) => (
    <>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
    </>
);

Layout.propTypes = {
    children: PropTypes.any,
};

export default Layout;
