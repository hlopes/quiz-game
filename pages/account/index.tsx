import React, { useState, useCallback, useEffect } from 'react';
import useDarkMode from 'use-dark-mode';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';

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

import useWithSession from '@helpers/useWithSession';
import usePlayerContext from '@helpers/usePlayerContext';
import useBreakpoints from '@helpers/useBreakpoints';
import useHydrationRender from '@helpers/useHydrationRender';
import Layout from '@components/layout/Layout';
import GenderInput from '@components/gender-input';
import GlobalLoader from '@components/global-loader';

import {
    StyledItemGroup,
    StyledStatisticGroup,
    StyledLogoutButton,
    StyledSaveButton,
} from '@theme/pages/Account.styles';

const Account: NextPage = () => {
    useWithSession();

    const { value: isDark } = useDarkMode(false);
    const isHydrationRender = useHydrationRender();
    const { lteSmall } = useBreakpoints();
    const { isLoading, data, updatePreferences, logout } = usePlayerContext();

    const [gender, setGender] = useState(
        data?.player?.preferences?.gender ?? ''
    );

    const { handleSubmit, register, setValue } = useForm({
        defaultValues: {
            numQuestions: 3,
        },
    });

    const submit = useCallback(
        ({ numQuestions }) => {
            if (data) {
                updatePreferences(data?.player?.name, numQuestions, gender);
            }
        },
        [data, gender, updatePreferences]
    );
    const handleGender = useCallback((gender) => setGender(gender), []);

    useEffect(() => {
        if (data?.player) {
            setValue('numQuestions', data?.player?.preferences?.numQuestions);
            setGender(data?.player?.preferences?.gender);
        }
    }, [data, setValue]);

    if (isLoading || !data?.player) {
        return <GlobalLoader isDark={isDark} />;
    }

    return (
        <Layout>
            <Segment inverted={isDark} raised padded={lteSmall ? true : 'very'}>
                <StyledItemGroup>
                    <Item>
                        {data?.player?.preferences?.gender ? (
                            <Item.Image
                                size="tiny"
                                src={
                                    data?.player?.preferences?.gender ===
                                    'female'
                                        ? 'female.png'
                                        : 'male.png'
                                }
                                circular
                            />
                        ) : null}
                        <Item.Content verticalAlign="middle">
                            <List>
                                <List.Item>
                                    <Icon name="user circle" />
                                    {data?.player?.name}
                                </List.Item>
                            </List>
                        </Item.Content>
                        <StyledLogoutButton primary size="big" onClick={logout}>
                            Logout
                        </StyledLogoutButton>
                    </Item>
                </StyledItemGroup>
                <Divider />
                <StyledStatisticGroup
                    inverted={isDark}
                    size={lteSmall ? 'mini' : 'small'}
                >
                    <Statistic
                        label="Score"
                        color="olive"
                        value={data?.player?.statistics?.points}
                    />
                    <Statistic
                        label="Questions"
                        color="teal"
                        value={data?.player?.statistics?.questionsAnswered}
                    />
                </StyledStatisticGroup>
                <Divider />
                <Form inverted={isDark} onSubmit={handleSubmit(submit)}>
                    <Form.Field>
                        <GenderInput
                            gender={gender}
                            onSetGender={handleGender}
                        />
                    </Form.Field>
                    <Form.Field inline>
                        <label>Nº of questions</label>
                        {!isHydrationRender && (
                            <input
                                ref={register}
                                name="numQuestions"
                                type="number"
                                min={3}
                                max={20}
                            />
                        )}
                    </Form.Field>
                    <StyledSaveButton primary size="big">
                        Save
                    </StyledSaveButton>
                </Form>
            </Segment>
        </Layout>
    );
};

export default Account;
