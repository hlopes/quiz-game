import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import useUserContext from './useUserContext';

export default function withAuth(Component) {
    return function WithAuthComponent(props) {
        const router = useRouter();
        const { user } = useUserContext();
        const [session, loading] = useSession();

        useEffect(() => {
            if (!user?.email && !session && !loading) {
                router.push('/signin');
            }

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [user, session, loading]);

        return !user?.email ? (
            <noscript>
                <p>JS is disabled?</p>
            </noscript>
        ) : (
            <Component {...props} />
        );
    };
}
