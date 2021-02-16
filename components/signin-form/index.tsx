import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Form, Button } from 'semantic-ui-react';

import usePlayerContext from '@helpers/usePlayerContext';
import { useNotificationContext } from '@helpers/useNotificationsContext';
import { Error } from '@theme/styles';

import { Category } from '../../types/NotificationContext';

import { StyledForm } from './styles';

const SigninForm: FC = () => {
    const router = useRouter();
    const { handleSubmit, register, errors } = useForm();

    const { add, clear } = useNotificationContext();
    const { data, loginPlayer, error } = usePlayerContext();

    useEffect(() => {
        clear();

        if (data?.player) {
            add({
                category: Category.Success,
            });

            router.push('/');
        } else if (error) {
            add({
                category: Category.Error,
                message: error?.message,
            });
        }
    }, [clear, add, router, data, error]);

    return (
        <StyledForm onSubmit={handleSubmit(loginPlayer)}>
            <Form.Field>
                <input
                    name="name"
                    placeholder="Name"
                    ref={register({
                        required: 'Required field',
                    })}
                />
                <Error>{errors.username && errors.username.message}</Error>
            </Form.Field>
            <Form.Field>
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    ref={register({ required: 'Required field' })}
                />
                <Error>{errors.password && errors.password.message}</Error>
            </Form.Field>
            <Button size="big">Enter</Button>
        </StyledForm>
    );
};

export default SigninForm;
