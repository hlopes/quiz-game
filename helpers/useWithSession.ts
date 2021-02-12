import { useEffect } from 'react';

import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const useWithSession = () => {
    const router = useRouter();
    const [session, loading] = useSession();

    useEffect(() => {
        if (!session && !loading) {
            router.push('/');
        }
    }, [loading, router, session]);

    return {
        session,
        loading,
    };
};

export default useWithSession;
