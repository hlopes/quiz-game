import React, { useCallback, useEffect } from 'react';
import {
    Button,
    Dimmer,
    Form,
    Grid,
    Header as HeaderSem,
    Loader,
    Segment,
} from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { compose } from 'recompose';

import { EMAIL_REGEX } from '../../utils/regexes';
import {
    NOTIFICATION_CATEGORIES,
    useNotificationContext,
    withNotificationProvider,
} from '../../hooks/useNotificationsContext';
import useUserContext from '../../hooks/useUserContext';
import withGuest from '../../hooks/withGuest';
import useRegister from '../../hooks/useRegister';
import Layout from '../../components/layout/Layout';

import styles from './Register.module.css';

const Register = () => {
    const router = useRouter();
    const { add, clear } = useNotificationContext();
    const { dispatch } = useUserContext();

    const [registerUser, { isLoading, data, error }] = useRegister();
    const { handleSubmit, register, errors, setValue } = useForm();

    const submit = useCallback(
        ({ name, username, password }) => {
            // TODO deal with promise
            registerUser({ name, username, password });
        },
        [registerUser]
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
                name: 'name',
            },
            { required: 'Required field' }
        );
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
        clear();

        if (error || data?.errorCode) {
            add({
                message: error?.message ?? data?.message,
                category: NOTIFICATION_CATEGORIES.error,
            });
        } else if (data?.user) {
            add({
                category: NOTIFICATION_CATEGORIES.success,
                onClose: onSuccess,
            });
        }
    }, [add, error, data, onSuccess, clear]);

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
                            New Player
                        </HeaderSem>
                        <Form size="large" onSubmit={handleSubmit(submit)}>
                            <Segment stacked>
                                <Form.Input
                                    name="name"
                                    fluid
                                    placeholder="Name"
                                    onChange={changeValue}
                                    error={!!errors.name}
                                />
                                <p className={styles.error}>
                                    {errors.name && errors.name.message}
                                </p>
                                <Form.Input
                                    name="username"
                                    fluid
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
                                    Register
                                </Button>
                            </Segment>
                        </Form>
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

export default enhanced(Register);
