import React, { useState, useCallback } from 'react';

import Layout from '../../components/Layout';
import useFetchData from '../../hooks/useFetchData';

import styles from './Register.module.css';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const changeName = useCallback((e) => setName(e.target.value), [setName]);
    const changeEmail = useCallback((e) => setEmail(e.target.value), [
        setEmail,
    ]);
    const changePassword = useCallback((e) => setPassword(e.target.value), [
        setPassword,
    ]);

    const [{ data, isLoading, isError }, doFetch] = useFetchData();

    console.log('### data ', data);
    console.log('### isLoading ', isLoading);
    console.log('### isError ', isError);

    const submit = useCallback(
        (event) => {
            event.preventDefault();

            doFetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });
        },
        [doFetch, name, email, password]
    );

    return <Layout></Layout>;
};

export default Login;
