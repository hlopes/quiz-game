import React, {
    useState,
    useContext,
    useRef,
    useCallback,
    useMemo,
    useEffect,
} from 'react';
import { toast } from 'react-toastify';

const NotificationContext = React.createContext({});

const AUTOCLOSE_TOAST = 2000;

export const NOTIFICATION_CATEGORIES = {
    error: 'ERROR',
    success: 'SUCCESS',
};

export function NotificationContextProvider(props) {
    const [notifications, setNotifications] = useState([]);
    const uid = useRef(0);

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

    const context = useMemo(
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
}

export function useNotificationContext() {
    return useContext(NotificationContext);
}

export function withNotificationProvider(Component) {
    return function WithNotificationProvider(props) {
        return (
            <NotificationContextProvider>
                <Component {...props} />
            </NotificationContextProvider>
        );
    };
}

export default NotificationContext;
