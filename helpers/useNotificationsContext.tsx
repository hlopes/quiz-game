import React, {
    FC,
    useState,
    useContext,
    useRef,
    useCallback,
    useMemo,
    useEffect,
} from 'react';
import { toast } from 'react-toastify';

import {
    NotificationContext as NotificationContextType,
    Notification,
} from '../types/NotificationContext';

const NotificationContext = React.createContext<NotificationContextType>({
    notifications: [],
    clear(): void {},
    filterByCategory(c: string): void {}, // eslint-disable-line no-unused-vars
    remove(id: string): void {}, // eslint-disable-line no-unused-vars
    add(n: Notification): void {}, // eslint-disable-line no-unused-vars
});

const AUTOCLOSE_TOAST = 1000;

export const NOTIFICATION_CATEGORIES = {
    error: 'ERROR',
    success: 'SUCCESS',
};

export const NotificationContextProvider: FC = (props) => {
    const [notifications, setNotifications] = useState([]);
    const uid = useRef<number>(0);

    const remove = useCallback((uid) => {
        setNotifications((oldNotifications) => {
            const filteredNotifications = oldNotifications.filter(
                (notification) => notification.uid !== uid
            );

            return filteredNotifications;
        });
    }, []);

    const add = useCallback(
        (notification) => {
            const id = ++uid.current;

            setNotifications((notifications) => [
                ...notifications,
                { ...notification, uid: id },
            ]);

            return () => remove(id);
        },
        [remove]
    );

    const clear = useCallback(() => {
        setNotifications([]);
    }, []);

    const filterByCategory = useCallback((category) => {
        setNotifications((oldNotifications) => {
            const filteredNotifications = oldNotifications.filter(
                (notification) => notification.category === category
            );

            return filteredNotifications;
        });
    }, []);

    useEffect(() => {
        notifications.forEach((notification) => {
            switch (notification.category) {
                case NOTIFICATION_CATEGORIES.error:
                    return toast(notification.message ?? 'Error', {
                        className: 'Toastify__toast--error',
                    });
                case NOTIFICATION_CATEGORIES.success:
                    return toast(notification.message ?? 'Success', {
                        className: 'Toastify__toast--success',
                        onClose: notification?.onClose,
                        autoClose: AUTOCLOSE_TOAST,
                    });
                default:
                    return toast(
                        notification.message ?? 'Message without category'
                    );
            }
        });
    }, [notifications]);

    const context: NotificationContextType = useMemo(
        () => ({
            notifications,
            add,
            remove,
            clear,
            filterByCategory,
        }),
        [notifications, add, remove, clear, filterByCategory]
    );

    return <NotificationContext.Provider value={context} {...props} />;
};

export const useNotificationContext = (): NotificationContextType =>
    useContext<NotificationContextType>(NotificationContext);

export default NotificationContext;
