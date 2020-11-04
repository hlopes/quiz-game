import React, { useCallback, useEffect } from 'react';
import { Button, Dimmer, Form, Loader, Segment } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { compose } from 'recompose';

import { useRouter } from 'next/router';

import { EMAIL_REGEX } from '../../../utils/regexes';
import {
    NOTIFICATION_CATEGORIES,
    useNotificationContext,
    withNotificationProvider,
} from '../../../common/useNotificationsContext';
import useLogin from '../../../common/useLogin';
import useUserContext from '../../../common/useUserContext';

import styles from '../Signin.module.css';

const SigninForm = () => {
    const router = useRouter();
    const { dispatch } = useUserContext();
    const { add, clear } = useNotificationContext();
    const { handleSubmit, register, errors, setValue, getValues } = useForm();

    const { username, password } = getValues();
    const { error, data, isLoading, refetch } = useLogin(username, password);

    const submit = useCallback(() => refetch(), [refetch]);

    const onSuccess = useCallback(() => {
        if (data?.user && data?.token) {
            localStorage.setItem('jwt', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            dispatch({ type: 'USER', payload: data.user });

            router.push('/');
        }
    }, [data, router, dispatch]);

    const changeValue = useCallback(
        (e, { name, value }) => {
            setValue(name, value);
        },
        [setValue]
    );

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
    }, [clear, add, error, onSuccess, data]);

    return (
        <Form size="large" onSubmit={handleSubmit(submit)}>
            {isLoading && (
                <Dimmer active inverted>
                    <Loader size="big">Loading</Loader>
                </Dimmer>
            )}
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
    );
};

SigninForm.propTypes = {};

const enhanced = compose(withNotificationProvider);

export default enhanced(SigninForm);
