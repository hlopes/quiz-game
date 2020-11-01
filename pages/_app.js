import React from 'react';
import PropTypes from 'prop-types';
import { ReactQueryDevtools } from 'react-query-devtools';

import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/globals.css';

import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import { UserContextProvider } from '../hooks/useUserContext';

const isDevelopment = process.env.NODE_ENV === 'development';

function MyApp({ Component, pageProps }) {
    return (
        <ErrorBoundary>
            <UserContextProvider>
                <Component {...pageProps} />
            </UserContextProvider>
            {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
        </ErrorBoundary>
    );
}

MyApp.propTypes = {
    Component: PropTypes.any,
    pageProps: PropTypes.object,
};

export default MyApp;
