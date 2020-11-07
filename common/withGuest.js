import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import useUserContext from './/useUserContext';

export default function withGuest(Component) {
    return function WithGuestComponent(props) {
        const router = useRouter();

        const { user } = useUserContext();

        useEffect(() => {
            if (user?.email) {
                router.push('/');
            }

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [user]);

        return user?.email ? null : <Component {...props} />;
    };
}
