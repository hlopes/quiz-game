import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import {
    Button,
    Form,
    Grid,
    Header as HeaderSem,
    Message,
    Segment,
    Loader,
    Dimmer,
} from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { compose } from 'recompose';

import Layout from '../../components/layout/Layout';
import useFetchData from '../../hooks/useFetchData';
import withGuest from '../../hooks/withGuest';
import {
    withNotificationProvider,
    useNotificationContext,
    NOTIFICATION_CATEGORIES,
} from '../../hooks/useNotificationsContext';
import { EMAIL_REGEX } from '../../utils/regexes';

import useUserContext from '../../hooks/useUserContext';

import styles from './Login.module.css';

const Login = () => {
    const router = useRouter();
    const [{ error, data, isLoading, isError }, doFetch] = useFetchData();
    const { add } = useNotificationContext();
    const { dispatch } = useUserContext();

    const { handleSubmit, register, errors, setValue } = useForm();

    const submit = useCallback(
        ({ username, password }) => {
            doFetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: username,
                    password,
                }),
            });
        },
        [doFetch]
    );

    const changeValue = useCallback(
        (e, { name, value }) => {
            setValue(name, value);
        },
        [setValue]
    );

    const onSuccess = useCallback(() => {
        if (data?.user && data?.token) {
            localStorage.setItem('jwt', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            dispatch({ type: 'USER', payload: data.user });

            router.push('/');
        }
    }, [data, router, dispatch]);

    useEffect(() => {
        register(
            {
                name: 'username',
            },
            {
                required: 'Required field',
                pattern: {
                    value: EMAIL_REGEX,
                    message: 'Invalid email address',
                },
            }
        );
        register({ name: 'password' }, { required: 'Required field' });
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (isError) {
            add({
                message: error?.message,
                category: NOTIFICATION_CATEGORIES.error,
            });
        } else if (data?.user) {
            add({
                category: NOTIFICATION_CATEGORIES.success,
                onClose: onSuccess,
            });
        }
    }, [add, isError, error, data, onSuccess]);

    return (
        <Layout>
            {isLoading && (
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
                            Login
                        </HeaderSem>
                        <Form size="large" onSubmit={handleSubmit(submit)}>
                            <Segment stacked>
                                <Form.Input
                                    name="username"
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Username/E-mail"
                                    onChange={changeValue}
                                    error={!!errors.username}
                                />
                                <p className={styles.error}>
                                    {errors.username && errors.username.message}
                                </p>
                                <Form.Input
                                    name="password"
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="password"
                                    onChange={changeValue}
                                    error={!!errors.password}
                                />
                                <p className={styles.error}>
                                    {errors.password && errors.password.message}
                                </p>
                                <Button primary fluid size="huge">
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <Link href={'/register'}>Sign Up</Link>
                        </Message>
                    </Grid.Column>
                    <Grid.Column
                        width={5}
                        only="tablet computer large screen widescreen"
                    />
                </Grid.Row>
            </Grid>
        </Layout>
    );
};

const enhanced = compose(withGuest, withNotificationProvider);

export default enhanced(Login);
