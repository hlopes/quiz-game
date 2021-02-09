import React from 'react';
import useDarkMode from 'use-dark-mode';
import { GenericObject, SessionBase } from 'next-auth/_utils';
import { Provider as AuthProvider } from 'next-auth/client';
import { ThemeProvider } from '@emotion/react';

import { HydrationRenderProvider } from '@helpers/useHydrationRender';
import { NotificationContextProvider } from '@helpers/useNotificationsContext';
import HackyFlashSolution from '@components/hacky-flash-solution';
import { LIGHT_THEME, DARK_THEME, StyledToastContainer } from '@theme/styles';

type ProvidersProps = {
    session: SessionBase & GenericObject;
    children: any;
};

const Providers = ({ session, children }: ProvidersProps) => {
    const { value } = useDarkMode(false);
    const theme = value ? DARK_THEME : LIGHT_THEME;

    return (
        <ThemeProvider theme={theme}>
            <AuthProvider session={session}>
                <HydrationRenderProvider>
                    <NotificationContextProvider>
                        <StyledToastContainer hideProgressBar />
                        <HackyFlashSolution>{children}</HackyFlashSolution>
                    </NotificationContextProvider>
                </HydrationRenderProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default Providers;
