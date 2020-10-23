import React from 'react';
import PropTypes from 'prop-types';

import Header from '../header/Header';

import ResponsiveContainer from './responsive-container/ResponsiveContainer';

const Layout = ({ children }) => (
    <>
        <Header />
        <ResponsiveContainer>{children}</ResponsiveContainer>
    </>
);

Layout.propTypes = {
    children: PropTypes.any,
};

export default Layout;