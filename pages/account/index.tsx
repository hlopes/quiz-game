import React, { useState, useCallback, useEffect } from 'react';
import useDarkMode from 'use-dark-mode';
import { NextPage } from 'next';
import { signout } from 'next-auth/client';
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
import userPlayer from '@helpers/usePlayer';
import useBreakpoints from '@helpers/useBreakpoints';
import usePreferences from '@helpers/usePreferences';
import useHydrationRender from '@helpers/useHydrationRender';
import Layout from '@components/layout/Layout';
import GenderInput from '@components/gender-input';

import {
    StyledItemGroup,
    StyledItem,
    StyledStatisticGroup,
} from '@theme/pages/Account.styles';

const Account: NextPage = () => {
    const { value: isDark } = useDarkMode(false);
    const { session, loadingComponent } = useWithSession(isDark);
    const isHydrationRender = useHydrationRender();
    const { lteSmall } = useBreakpoints();

    const { wasFetched, data: player, isValidating, refetch } = userPlayer();
    const { update } = usePreferences();

    const [gender, setGender] = useState(player?.gender ?? '');

    const { handleSubmit, register, setValue } = useForm({
        defaultValues: {
            numQuestions: 3,
        },
    });

    const submit = useCallback(
        ({ numQuestions }) => {
            update({ player, numQuestions, gender });
        },
        [update, player, gender]
    );
    const handleGender = useCallback((gender) => setGender(gender), []);
    const handleLogout = useCallback(() => signout(), []);

    useEffect(() => {
        if (session?.user?.email && !isValidating && !player && !wasFetched) {
            refetch(session.user.name);
        }
    }, [isValidating, player, refetch, session?.user, wasFetched]);

    useEffect(() => {
        if (player) {
            setValue('numQuestions', parseInt(player.numQuestions, 10));
        }
    }, [player, setValue]);

    if (loadingComponent) {
        return loadingComponent;
    }

    return (
        <Layout>
            <Segment inverted={isDark} raised padded={lteSmall ? true : 'very'}>
                <StyledItemGroup>
                    <StyledItem>
                        {player?.user?.image ? (
                            <Item.Image
                                size="tiny"
                                src={player?.user?.image}
                                circular
                            />
                        ) : null}
                        <Item.Content verticalAlign="middle">
                            <List>
                                <List.Item>
                                    <Icon name="user circle" />
                                    {player?.user?.name}
                                </List.Item>
                                <List.Item>
                                    <Icon name="mail" />
                                    {player?.user?.email}
                                </List.Item>
                            </List>
                        </Item.Content>
                    </StyledItem>
                </StyledItemGroup>
                <Button primary size="big" onClick={handleLogout}>
                    Logout
                </Button>
                <Divider />
                <StyledStatisticGroup
                    inverted={isDark}
                    size={lteSmall ? 'mini' : 'small'}
                >
                    <Statistic
                        label="Score"
                        color="olive"
                        value={player?.user?.points}
                    />
                    <Statistic
                        label="Questions"
                        color="teal"
                        value={player?.user?.questionsAnswered}
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
                    <Button primary size="big">
                        Save
                    </Button>
                </Form>
            </Segment>
        </Layout>
    );
};

export default Account;
