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
import { ToastContainer, toast } from 'react-toastify';

import Layout from '../../components/Layout';
import useFetchData from '../../hooks/useFetchData';
import { EMAIL_REGEX } from '../../utils/regexes';

import styles from './Login.module.css';

const AUTOCLOSE_TOAST = 2000;

const Login = () => {
    const router = useRouter();
    const [{ error, data, isLoading, isError }, doFetch] = useFetchData();
    console.log('### data ', data);
    console.log('### isLoading ', isLoading);
    console.log('### isError ', isError);
    console.log('### error ', error);

    const { handleSubmit, register, errors, setValue } = useForm();
    console.log('### errors ', errors);

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

            router.push('/');
        }
    }, [data, router]);

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
            toast(error?.message, {
                className: 'Toastify__toast--error',
            });
        } else if (data?.user) {
            toast('Success', {
                className: 'Toastify__toast--success',
                onClose: onSuccess,
                autoClose: AUTOCLOSE_TOAST,
            });
        }
    }, [isError, error, data, onSuccess]);

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
                    <Grid.Column width={5} />
                    <Grid.Column width={6}>
                        <HeaderSem as="h2" textAlign="center">
                            Login to your account
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
                                <Button primary fluid size="large">
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <Link href={'/register'}>Sign Up</Link>
                        </Message>
                    </Grid.Column>
                    <Grid.Column width={5} />
                </Grid.Row>
            </Grid>
        </Layout>
    );
};

export default Login;
