import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Dimmer,
    Grid,
    Header as HeaderSem,
    Loader,
    Message,
} from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';

import Link from 'next/link';
import { providers, signIn, useSession } from 'next-auth/client';

import Layout from '../../components/layout/Layout';

import SigninForm from './signin-form';

import styles from './Signin.module.css';

function Index({ providers }) {
    const [loading] = useSession();

    const handleSignInProvider = useCallback(
        (provider) => () => {
            signIn(provider);
        },
        []
    );

    return (
        <Layout>
            {loading && (
                <Dimmer active inverted>
                    <Loader size="big">Loading</Loader>
                </Dimmer>
            )}
            <ToastContainer bodyClassName={styles.toastBody} hideProgressBar />
            <Grid
                className={styles.form}
                textAlign="center"
                verticalAlign="middle"
            >
                <Grid.Row>
                    <Grid.Column
                        width={5}
                        only="tablet computer large screen widescreen"
                    />
                    <Grid.Column mobile={16} tablet={8} computer={6}>
                        <HeaderSem as="h2" textAlign="center" inverted>
                            Welcome Back
                        </HeaderSem>
                        <SigninForm />
                        <Message>
                            New to us? <Link href={'/register'}>Sign Up</Link>
                        </Message>
                        {providers
                            ? Object.values(
                                  providers
                              ).map((provider, index) => (
                                  <Button
                                      key={index}
                                      circular
                                      color={provider.id}
                                      icon={provider.id}
                                      onClick={handleSignInProvider(
                                          provider.id
                                      )}
                                      size={'big'}
                                  />
                              ))
                            : null}
                    </Grid.Column>
                    <Grid.Column
                        width={5}
                        only="tablet computer large screen widescreen"
                    />
                </Grid.Row>
            </Grid>
        </Layout>
    );
}

Index.propTypes = {
    providers: PropTypes.object,
};

Index.getInitialProps = async (context) => {
    return {
        providers: await providers(context),
    };
};

export default Index;
