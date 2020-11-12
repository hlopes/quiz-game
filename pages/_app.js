import React from 'react';
import PropTypes from 'prop-types';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Provider as AuthProvider } from 'next-auth/client';

import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/globals.css';

import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import { UserContextProvider } from '../common/useUserContext';
import { HydrationRenderProvider } from '../common/useHydrationRender';

const isDevelopment = process.env.NODE_ENV === 'development';

function App({ Component, pageProps }) {
    const { session } = pageProps;

    return (
        <ErrorBoundary>
            <HydrationRenderProvider>
                <AuthProvider session={session}>
                    <UserContextProvider>
                        <Component {...pageProps} />
                    </UserContextProvider>
                </AuthProvider>
            </HydrationRenderProvider>
            {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
        </ErrorBoundary>
    );
}

App.propTypes = {
    Component: PropTypes.any,
    pageProps: PropTypes.object,
};

export default App;
