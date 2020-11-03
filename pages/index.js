import React from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    Header,
    Segment,
    Divider,
    Table,
    Image,
} from 'semantic-ui-react';
import { signin, signout, useSession } from 'next-auth/client';

import getRandomAvatar from '../utils/randomAvatar';
import { connectToDatabase } from '../utils/mongodb';
import Layout from '../components/layout/Layout';

import styles from './Home.module.css';

const Home = ({ top }) => {
    const [session] = useSession();

    return (
        <Layout>
            <noscript>
                <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
            </noscript>
            <p className={'nojs-show'}>
                {!session && (
                    <>
                        <span className={styles.notSignedIn}>
                            Not signed in
                        </span>
                        <a
                            href={`/api/auth/signin`}
                            onClick={(e) => {
                                e.preventDefault();
                                signin();
                            }}
                        >
                            <button className={styles.signinButton}>
                                Sign in
                            </button>
                        </a>
                    </>
                )}
                {session && (
                    <>
                        <span className={styles.signedIn}>
                            Signed in as <strong>{session.user.email}</strong>
                        </span>
                        <a
                            href={`/api/auth/signout`}
                            onClick={(e) => {
                                e.preventDefault();
                                signout();
                            }}
                        >
                            <button className={styles.signoutButton}>
                                Sign out
                            </button>
                        </a>
                    </>
                )}
            </p>
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
                                Welcome to Quiz Game
                            </Header>
                            <p>This is just a show case game using NextJS.</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Divider />
            <Segment vertical>
                <Grid celled="internally" columns="equal" stackable centered>
                    <Grid.Row>
                        <Grid.Column textAlign="center">
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
                                    {top?.map((player, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>
                                                <Header as="h4" image inverted>
                                                    {player.image ? (
                                                        <Image
                                                            src={
                                                                player.image
                                                            }
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
