import React from 'react';
import { NextPage } from 'next';

import Layout from '@components/layout/Layout';
import SigninForm from '@components/signin-form';

import { Header, Segment } from 'semantic-ui-react';
import useDarkMode from 'use-dark-mode';

import useBreakpoints from '@helpers/useBreakpoints';
import usePlayerContext from '@helpers/usePlayerContext';
import GlobalLoader from '@components/global-loader';

const SignIn: NextPage = () => {
    const { value: isDark } = useDarkMode(false);
    const { lteSmall } = useBreakpoints();
    const { isLoading } = usePlayerContext();

    if (isLoading) {
        return <GlobalLoader isDark={isDark} />;
    }
    return (
        <Layout>
            <Segment inverted={isDark} raised padded={lteSmall ? true : 'very'}>
                <Header as="h1">Enter your credentials</Header>
                <p>
                    You can insert any username. Please do not use a valid/real
                    email.Thank you.
                </p>
                <p>(existing account: abc/123)</p>
                <SigninForm />
            </Segment>
        </Layout>
    );
};

export default SignIn;
