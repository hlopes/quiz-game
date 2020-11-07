import React from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    Header,
    Segment,
    Table,
    Image,
    Divider,
} from 'semantic-ui-react';

import getRandomAvatar from '../utils/randomAvatar';
import { connectToDatabase } from '../utils/mongodb';
import Layout from '../components/layout/Layout';

const Home = ({ top }) => {
    return (
        <Layout>
            <Segment
                raised
                padded="very"
                compact
                style={{ backgroundColor: '#fff', margin: '0 auto' }}
            >
                <Header as="h3">Welcome to Quiz Game</Header>
                <p>This is just a show case game using NextJS.</p>
                <br />
                <Divider />
                <Grid celled="internally" columns="equal" stackable centered>
                    <Grid.Row>
                        <Grid.Column textAlign="center">
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
                                        <Table.HeaderCell>
                                            Player
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Score
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Correct
                                        </Table.HeaderCell>
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
                                                    {player.image ? (
                                                        <Image
                                                            src={player.image}
                                                            rounded
                                                            size="mini"
                                                        />
                                                    ) : (
                                                        <Image
                                                            src={getRandomAvatar()}
                                                            rounded
                                                            size="mini"
                                                        />
                                                    )}
                                                    <Header.Content>
                                                        {player.name}
                                                    </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell textAlign="center">
                                                {player.score}%
                                            </Table.Cell>
                                            <Table.Cell textAlign="right">
                                                {player.points}
                                            </Table.Cell>
                                            <Table.Cell textAlign="right">
                                                {player.questionsAnswered}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
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

    const users = await db
        .collection('users')
        .find()
        .limit(10)
        .sort({ score: -1 })
        .toArray();

    return {
        props: {
            top: JSON.parse(JSON.stringify(users)),
        },
    };
}
