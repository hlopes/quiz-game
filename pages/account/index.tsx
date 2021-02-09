import React, { useState, useCallback, useEffect } from 'react';
import useDarkMode from 'use-dark-mode';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { signout, getSession, useSession } from 'next-auth/client';
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
    Loader,
    Dimmer,
} from 'semantic-ui-react';

import { getUserByEmail } from '@lib/user';
import useBreakpoints from '@helpers/useBreakpoints';
import useSetPreferences from '@helpers/useSetPreferences';
import useHydrationRender from '@helpers/useHydrationRender';
import Layout from '@components/layout/Layout';

import { User } from '../../types/User';

import GenderInput from './gender-input';

import { StyledItemGroup, StyledItem, StyledStatisticGroup } from './styles';

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const player = await getUserByEmail(session?.user.email);

    return {
        props: {
            shouldRedirectHome: !session,
            player: JSON.parse(JSON.stringify(player)),
        },
    };
}

type AccountProps = {
    shouldRedirectHome: boolean;
    player: {
        gender: string;
        numQuestions: number;
        user: User;
    };
};

const Account: NextPage<AccountProps> = ({
    shouldRedirectHome,
    player,
}: AccountProps) => {
    const { value: isDark } = useDarkMode(false);
    const [session, loading] = useSession();
    const router = useRouter();
    const isHydrationRender = useHydrationRender();
    const { lteSmall } = useBreakpoints();

    const [gender, setGender] = useState(player?.gender ?? '');

    const { handleSubmit, register } = useForm({
        defaultValues: { numQuestions: player?.numQuestions ?? 3 },
    });

    const setPreferences = useSetPreferences();

    const submit = useCallback(
        ({ numQuestions }) => {
            setPreferences({ numQuestions, gender });
        },
        [setPreferences, gender]
    );
    const handleGender = useCallback((gender) => setGender(gender), []);
    const handleLogout = useCallback(() => signout(), []);

    useEffect(() => {
        if (shouldRedirectHome || (!session && !loading)) {
            router.push('/');
        }
    }, [loading, router, session, shouldRedirectHome]);

    if (loading) {
        return (
            <Layout>
                <Dimmer active inverted={!isDark}>
                    <Loader size="big">Loading</Loader>
                </Dimmer>
            </Layout>
        );
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
