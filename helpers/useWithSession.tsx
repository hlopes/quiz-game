import React, { useEffect } from 'react';

import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Layout from '@components/layout/Layout';
import { Dimmer, Loader } from 'semantic-ui-react';

const useWithSession = (isDark) => {
    const router = useRouter();
    const [session, loading] = useSession();

    useEffect(() => {
        if (!session && !loading) {
            router.push('/');
        }
    }, [loading, router, session]);

    const withoutSessionLoading =
        loading || !session ? (
            <Layout>
                <Dimmer active inverted={!isDark}>
                    <Loader size="big">Loading</Loader>
                </Dimmer>
            </Layout>
        ) : null;

    return {
        session,
        loadingComponent: withoutSessionLoading,
    };
};

export default useWithSession;
