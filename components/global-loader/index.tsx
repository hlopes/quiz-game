import React, { FC } from 'react';

import Layout from '@components/layout/Layout';
import { Dimmer, Loader } from 'semantic-ui-react';

type GlobalLoaderProps = {
    isDark: boolean;
};

const GlobalLoader: FC<GlobalLoaderProps> = ({ isDark }: GlobalLoaderProps) => {
    return (
        <Layout>
            <Dimmer active inverted={!isDark}>
                <Loader size="big">Loading</Loader>
            </Dimmer>
        </Layout>
    );
};

export default GlobalLoader;
