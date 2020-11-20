import React from 'react';
import PropTypes from 'prop-types';
import {
    Label,
    Header,
    Segment,
    Table,
    Image,
    Divider,
} from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';

import getAvatar from '../utils/getAvatar';
import { connectToDatabase } from '../utils/mongodb';
import Layout from '../components/layout/Layout';
import useBreakpoints from '../common/useBreakpoints';

const Home = ({ top }) => {
    const { lteSmall } = useBreakpoints();

    return (
        <Layout>
            <Segment raised padded={lteSmall ? true : 'very'}>
                <Header as="h2">Welcome to Quiz Game</Header>
                <p>This is just a game built with NextJS.</p>
                <br />
                <Divider />
                {!isEmpty(top) ? (
                    <>
                        <Header as="h3">Top 10</Header>
                        <Table
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
                                                {player?.user?.image ? (
                                                    <Image
                                                        alt={player?.user?.name}
                                                        src={
                                                            player?.user?.image
                                                        }
                                                        rounded
                                                        size="mini"
                                                    />
                                                ) : (
                                                    <Image
                                                        alt={player?.user?.name}
                                                        src={getAvatar(
                                                            player?.gender
                                                        )}
                                                        rounded
                                                        size="mini"
                                                    />
                                                )}
                                                {player?.user?.name}
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell textAlign="right">
                                            {player?.user?.points > 0 ? (
                                                <Label color="blue">
                                                    {player?.user?.points}
                                                </Label>
                                            ) : (
                                                <Label color="yellow">
                                                    {player?.user?.points}
                                                </Label>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell textAlign="right">
                                            {player?.user?.questionsAnswered}
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

Home.propTypes = {
    top: PropTypes.array,
};

export default Home;

export async function getServerSideProps() {
    const { db } = await connectToDatabase();

    const usersWithPreferences = await db
        .collection('preferences')
        .find()
        .limit(10)
        .sort({ ['user.points']: -1 })
        .toArray();

    return {
        props: {
            top: JSON.parse(JSON.stringify(usersWithPreferences)),
        },
    };
}
