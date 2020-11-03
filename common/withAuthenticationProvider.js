import React from 'react';

import { Provider as AuthProvider } from 'next-auth/client';

import {NotificationContextProvider} from './useNotificationsContext';

export function withNotificationProvider(Component) {
    return function WithNotificationProvider(props) {
        return (
            <NotificationContextProvider>
                <Component {...props} />
            </NotificationContextProvider>
        );
    };
}
