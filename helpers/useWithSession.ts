import { useEffect } from 'react';

import { useRouter } from 'next/router';
import usePlayerContext from '@helpers/usePlayerContext';

const useWithSession = () => {
    const router = useRouter();
    const { data, isLoading } = usePlayerContext();

    useEffect(() => {
        if (data?.player === null && !isLoading) {
            router.push('/');
        }
    }, [data, router, isLoading]);
};

export default useWithSession;
