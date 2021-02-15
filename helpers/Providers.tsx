import React from 'react';
import useDarkMode from 'use-dark-mode';
import { ThemeProvider } from '@emotion/react';

import { PlayerContextProvider } from '@helpers/usePlayerContext';
import { HydrationRenderProvider } from '@helpers/useHydrationRender';
import { NotificationContextProvider } from '@helpers/useNotificationsContext';
import HackyFlashSolution from '@components/hacky-flash-solution';
import { LIGHT_THEME, DARK_THEME, StyledToastContainer } from '@theme/styles';

type ProvidersProps = {
    children: any;
};

const Providers = ({ children }: ProvidersProps) => {
    const { value } = useDarkMode(false);
    const theme = value ? DARK_THEME : LIGHT_THEME;

    return (
        <ThemeProvider theme={theme}>
            <HydrationRenderProvider>
                <PlayerContextProvider>
                    <NotificationContextProvider>
                        <StyledToastContainer hideProgressBar />
                        <HackyFlashSolution>{children}</HackyFlashSolution>
                    </NotificationContextProvider>
                </PlayerContextProvider>
            </HydrationRenderProvider>
        </ThemeProvider>
    );
};

export default Providers;
