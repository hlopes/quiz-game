import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import useUserContext from './/useUserContext';

export default function withGuest(Component) {
    return function WithGuestComponent(props) {
        const router = useRouter();

        const { state } = useUserContext();

        useEffect(() => {
            if (state?.email) {
                router.push('/');
            }

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [state]);

        return state?.email ? null : <Component {...props} />;
    };
}
