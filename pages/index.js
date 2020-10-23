import React from 'react';

import { Grid, Header, Segment, Divider } from 'semantic-ui-react';

import Layout from '../components/layout/Layout';

function Home() {
    return (
        <Layout>
            <Segment vertical inverted>
                <Grid container stackable verticalAlign="middle">
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header
                                as="h3"
                                style={{ fontSize: '2em' }}
                                inverted
                            >
                                Welcome to Quiz Game
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                We can give your company superpowers to do
                                things that they never thought possible. Let us
                                delight your customers and empower your needs...
                                through pure data analytics.
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Segment style={{ padding: '0em' }} vertical>
                <Grid celled="internally" columns="equal" stackable>
                    <Grid.Row textAlign="center">
                        <Grid.Column
                            style={{
                                paddingBottom: '5em',
                                paddingTop: '5em',
                            }}
                        >
                            <Divider />
                            <Header
                                as="h3"
                                style={{ fontSize: '2em' }}
                                inverted
                            >
                                Top 10
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>...</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Layout>
    );
}

export default Home;
