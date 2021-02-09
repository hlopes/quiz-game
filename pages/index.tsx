import React from 'react';
import useDarkMode from 'use-dark-mode';
import { NextPage } from 'next';
import isEmpty from 'lodash/isEmpty';

import {
    Label,
    Header,
    Segment,
    Table,
    Image,
    Divider,
} from 'semantic-ui-react';

import { getTopPlayers } from '@lib/user';
import useBreakpoints from '@helpers/useBreakpoints';
import Layout from '@components/layout/Layout';

import { User } from '../types/User';

export const getStaticProps = async () => {
    const top = await getTopPlayers();

    return {
        props: {
            top: JSON.parse(JSON.stringify(top)),
        },
    };
};

type HomeProps = {
    top: User[];
};

const Home: NextPage<HomeProps> = ({ top }: HomeProps) => {
    const { value: isDark } = useDarkMode(false);
    const { lteSmall } = useBreakpoints();

    return (
        <Layout>
            <Segment inverted={isDark} raised padded={lteSmall ? true : 'very'}>
                <Header as="h1">Welcome to Quiz Game</Header>
                <p>This is just a game built with NextJS.</p>
                <br />
                <Divider />
                {!isEmpty(top) ? (
                    <>
                        <Header as="h3">Top 10</Header>
                        <Table
                            inverted={isDark}
                            basic="very"
                            celled
                            collapsing
                            unstackable
                            striped
                        >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Player</Table.HeaderCell>
                                    <Table.HeaderCell>Score</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Questions
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {top?.map((player, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell>
                                            <Header as="h4" image>
                                                {player?.image ? (
                                                    <Image
                                                        alt={player?.name}
                                                        src={player?.image}
                                                        rounded
                                                        size="mini"
                                                    />
                                                ) : (
                                                    <Image
                                                        alt={player?.name}
                                                        src={'default.png'}
                                                        rounded
                                                        size="mini"
                                                    />
                                                )}
                                            </Header>
                                            {player?.name}
                                        </Table.Cell>
                                        <Table.Cell textAlign="right">
                                            {player?.points > 0 ? (
                                                <Label color="blue">
                                                    {player?.points}
                                                </Label>
                                            ) : (
                                                <Label color="yellow">
                                                    {player?.points}
                                                </Label>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell textAlign="right">
                                            {player?.questionsAnswered}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </>
                ) : null}
            </Segment>
        </Layout>
    );
};

export default Home;
