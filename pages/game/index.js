import React, { useEffect } from 'react';
import he from 'he';
import {
    Dimmer,
    Grid,
    Loader,
    Card,
    Image,
    Icon,
    List,
    Segment,
} from 'semantic-ui-react';

import shuffle from '../../utils/shuffle';
import Layout from '../../components/layout/Layout';
import withAuth from '../../hooks/withAuth';
import useFetchData from '../../hooks/useFetchData';

import Question from '../../components/question/Question';

import styles from './Game.module.css';

import data from './data.json';

const Game = () => {
    //const [{ error, data, isLoading, isError }, doFetch] = useFetchData();

    //const { handleSubmit, register, errors, setValue } = useForm();

    // useEffect(() => {
    //     doFetch('https://opentdb.com/api.php?amount=10');
    // }, [doFetch]);
    //
    // const hasError = isError || error || data?.response_code !== 0;
    //
    // if (hasError) {
    //     return <Layout>Something went wrong</Layout>;
    // }

    console.log('### results ', data?.results);
    let isLoading = false;

    return isLoading || !data?.results ? (
        <Dimmer active inverted>
            <Loader size="big">Loading</Loader>
        </Dimmer>
    ) : (
        <Layout>
            <Grid
                className={styles.wrapper}
                textAlign="center"
                verticalAlign="middle"
            >
                {data?.results.map((question, index) => {
                    return (
                        <Card fluid key={index}>
                            <Image
                                src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                                size="medium"
                            />
                            <Card.Content>
                                <Card.Header>
                                    {he.decode(question?.question)}
                                </Card.Header>
                                <Card.Description>
                                    {question?.category}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Segment>
                                    <List divided relaxed>
                                        <List.Item>
                                            <List.Content>
                                                <List.Header>
                                                    Snickerdoodle
                                                </List.Header>
                                                An excellent companion
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content>
                                                <List.Header>
                                                    Poodle
                                                </List.Header>
                                                A poodle, its pretty basic
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content>
                                                <List.Header>Paulo</List.Header>
                                                He's also a dog
                                            </List.Content>
                                        </List.Item>
                                    </List>
                                </Segment>
                                <Question question={question} />
                            </Card.Content>
                        </Card>
                    );
                })}
            </Grid>
        </Layout>
    );
};

export default withAuth(Game);
