import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import useUserContext from './useUserContext';

export default function withAuth(Component) {
    return function WithAuthComponent(props) {
        const router = useRouter();
        const { state } = useUserContext();

        useEffect(() => {
            if (!state?.email) {
                router.push('/login');
            }

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [state]);

        return !state?.email ? null : <Component {...props} />;
    };
}
