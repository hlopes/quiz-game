import React from 'react';

import {
    Grid,
    Header,
    Segment,
    Divider,
    Table,
    Image,
} from 'semantic-ui-react';

//import useTop10 from '../hooks/useTop10';
import getRandomAvatar from '../utils/randomAvatar';
import { connectToDatabase } from '../utils/mongodb';
import Layout from '../components/layout/Layout';

const Home = ({ isConnected }) => {
    return (
        <Layout>
            <Segment vertical inverted>
                <Grid container stackable verticalAlign="middle" centered>
                    <Grid.Row>
                        <Grid.Column
                            mobile={16}
                            tablet={8}
                            computer={6}
                            textAlign="center"
                        >
                            <Header as="h3" inverted>
                                ###{isConnected}### Welcome to Quiz Game
                            </Header>
                            <p>This is just a show case game using NextJS.</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Divider />
            <Segment vertical>
                <Grid celled="internally" columns="equal" stackable>
                    <Grid.Row textAlign="center">
                        <Grid.Column>
                            <Header as="h3" inverted>
                                Top 10
                            </Header>
                            <Table
                                basic="very"
                                celled
                                collapsing
                                inverted
                                unstackable
                            >
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            Player
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Score
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {[]?.map((player, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>
                                                <Header as="h4" image inverted>
                                                    <Image
                                                        src={getRandomAvatar()}
                                                        rounded
                                                        size="mini"
                                                    />
                                                    <Header.Content>
                                                        {player.name}
                                                    </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>
                                                {player.score}%
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
