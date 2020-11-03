import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Header as HeaderSem, Message } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';

import Link from 'next/link';
import { providers, signIn } from 'next-auth/client';

import Layout from '../../components/layout/Layout';

import styles from '../login/Login.module.css';

import SigninForm from './signin-form';

function Signin({ providers }) {
    const handleSignInProvider = useCallback(
        (provider) => () => {
            signIn(provider);
        },
        []
    );

    return (
        <Layout>
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
                    </Grid.Column>
                    <Grid.Column
                        width={5}
                        only="tablet computer large screen widescreen"
                    />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column
                        width={5}
                        only="tablet computer large screen widescreen"
                    />
                    <Grid.Column mobile={16} tablet={8} computer={6}>
                        {providers
                            ? Object.values(providers).map((provider) => (
                                  <div key={provider.name}>
                                      <Button
                                          primary
                                          onClick={handleSignInProvider(
                                              provider.id
                                          )}
                                          size="big"
                                      >
                                          Sign in with {provider.name}
                                      </Button>
                                  </div>
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

Signin.propTypes = {
    providers: PropTypes.object,
};

Signin.getInitialProps = async (context) => {
    return {
        providers: await providers(context),
    };
};

export default Signin;
