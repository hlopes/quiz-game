import React from 'react';

import {
    Grid,
    Header,
    Segment,
    Divider,
    Table,
    Image,
} from 'semantic-ui-react';

import Layout from '../components/layout/Layout';

const Home = () => {
    return (
        <Layout>
            <Segment vertical inverted>
                <Grid container stackable verticalAlign="middle" centered>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={8} computer={6}>
                            <Header as="h3" inverted>
                                Welcome to Quiz Game
                            </Header>
                            <p>
                                We can give your company superpowers to do
                                things that they never thought possible. Let us
                                delight your customers and empower your needs...
                                through pure data analytics.
                            </p>
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
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as="h4" image inverted>
                                                <Image
                                                    src="https://react.semantic-ui.com/images/avatar/small/lena.png"
                                                    rounded
                                                    size="mini"
                                                />
                                                <Header.Content>
                                                    Lena
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>22</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as="h4" image inverted>
                                                <Image
                                                    src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                                                    rounded
                                                    size="mini"
                                                />
                                                <Header.Content>
                                                    Matthew
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>15</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as="h4" image inverted>
                                                <Image
                                                    src="https://react.semantic-ui.com/images/avatar/small/lindsay.png"
                                                    rounded
                                                    size="mini"
                                                />
                                                <Header.Content>
                                                    Lindsay
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>12</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as="h4" image inverted>
                                                <Image
                                                    src="https://react.semantic-ui.com/images/avatar/small/mark.png"
                                                    rounded
                                                    size="mini"
                                                />
                                                <Header.Content>
                                                    Mark
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>11</Table.Cell>
                                    </Table.Row>
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
