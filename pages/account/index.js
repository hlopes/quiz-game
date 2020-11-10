import React, { useCallback, useEffect, useState } from 'react';
import { compose } from 'recompose';
import {
    Button,
    Divider,
    Item,
    Form,
    List,
    Segment,
    Statistic,
    Icon,
} from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';

import {
    NOTIFICATION_CATEGORIES,
    useNotificationContext,
    withNotificationProvider,
} from '../../common/useNotificationsContext';
import useBreakpoints from '../../common/useBreakpoints';
import useSetPreferences from '../../common/useSetPreferences';
import useGetPreferences from '../../common/useGetPreferences';
import withAuth from '../../common/withAuth';
import Layout from '../../components/layout/Layout';
import useUserContext from '../../common/useUserContext';

import GenderInput from './gender-input';

import styles from './Account.module.css';

const Account = () => {
    const [gender, setGender] = useState('');

    const { user } = useUserContext();
    const { lteSmall } = useBreakpoints();
    const { add, clear } = useNotificationContext();

    const { data: preferencesData, isFetchedAfterMount } = useGetPreferences();

    const userImage = user?.image ? user.image : 'default.png';

    const { handleSubmit, register, setValue } = useForm({
        defaultValues: { numQuestions: 3 },
    });

    const [setPreferences, { isLoading, data, error }] = useSetPreferences();

    const submit = useCallback(
        ({ numQuestions }) => {
            setPreferences({ numQuestions, gender }).catch(() =>
                add({
                    message: error?.message,
                    category: NOTIFICATION_CATEGORIES.error,
                })
            );
        },
        [setPreferences, gender, add, error?.message]
    );

    const handleGender = useCallback((gender) => setGender(gender), []);

    useEffect(() => {
        if (isFetchedAfterMount) {
            setValue(
                'numQuestions',
                parseInt(preferencesData?.numQuestions, 10)
            );

            setGender(preferencesData?.gender);
        }
    }, [isFetchedAfterMount, preferencesData, setValue]);

    useEffect(() => {
        clear();

        if (error || data?.errorCode) {
            add({
                message: error?.message ?? data?.message,
                category: NOTIFICATION_CATEGORIES.error,
            });
        } else if (data) {
            add({
                category: NOTIFICATION_CATEGORIES.success,
            });
        }
    }, [add, error, data, clear]);

    return (
        <Layout>
            <ToastContainer bodyClassName={styles.toastBody} hideProgressBar />
            <Segment raised padded={lteSmall ? true : 'very'}>
                <Item.Group className={styles.userWrapper}>
                    <Item className={styles.user}>
                        <Item.Image size="tiny" src={userImage} circular />
                        <Item.Content verticalAlign="middle">
                            <List>
                                <List.Item>
                                    <Icon name="user circle" />
                                    {user.name}
                                </List.Item>
                                <List.Item>
                                    <Icon name="mail" />
                                    {user.email}
                                </List.Item>
                            </List>
                        </Item.Content>
                    </Item>
                </Item.Group>
                <Divider />
                <Statistic.Group
                    className={styles.statistics}
                    size={lteSmall ? 'mini' : 'small'}
                >
                    <Statistic
                        label="Score"
                        color="olive"
                        value={user.points}
                    />
                    <Statistic
                        label="Questions"
                        color="teal"
                        value={user.questionsAnswered}
                    />
                </Statistic.Group>
                <Divider />
                <Form
                    onSubmit={handleSubmit(submit)}
                    loading={!isFetchedAfterMount || isLoading}
                >
                    <Form.Field>
                        <GenderInput
                            gender={gender}
                            onSetGender={handleGender}
                        />
                    </Form.Field>
                    <Form.Field inline>
                        <label>Nº of questions</label>
                        {isFetchedAfterMount && (
                            <input
                                ref={register}
                                name="numQuestions"
                                type="number"
                                min={3}
                                max={20}
                            />
                        )}
                    </Form.Field>
                    <Button primary size="big">
                        Save
                    </Button>
                </Form>
            </Segment>
        </Layout>
    );
};

Account.propTypes = {};

const enhanced = compose(withAuth, withNotificationProvider);

export default enhanced(Account);
