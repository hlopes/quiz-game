import React, { useState, useMemo, useCallback } from 'react';
import he from 'he';
import {
    Dimmer,
    Grid,
    Loader,
    Card,
    Icon,
    Segment,
    Button,
    Label,
    Statistic,
    Rating,
    Header,
} from 'semantic-ui-react';

import withAuth from '../../hooks/withAuth';
import useQuestions from '../../hooks/useQuestions';
import Layout from '../../components/layout/Layout';
import Question from '../../components/question/Question';

import styles from './Game.module.css';

const questionDifficultyTypes = [
    {
        value: 'easy',
        color: 'green',
    },
    {
        value: 'medium',
        color: 'orange',
    },
    {
        value: 'hard',
        color: 'red',
    },
];

const Game = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [displayScore, setDisplayScore] = useState(false);

    const { error, data, isLoading, refetch } = useQuestions();

    const currentQuestion = useMemo(
        () => data?.results?.[currentQuestionIndex],
        [currentQuestionIndex, data?.results]
    );

    const handleNext = useCallback(
        (isLast) => () => {
            const isCorrect =
                selectedAnswer === currentQuestion?.correct_answer;

            if (isCorrect) {
                setScore(score + 1);
            }

            if (!isLast) {
                setCurrentQuestionIndex(
                    Math.min(
                        currentQuestionIndex + 1,
                        data?.results?.length - 1
                    )
                );
            } else {
                setDisplayScore(true);
            }
        },
        [
            selectedAnswer,
            currentQuestion?.correct_answer,
            score,
            currentQuestionIndex,
            data?.results?.length,
        ]
    );

    const handleAnswerSelection = useCallback(
        (answer) => setSelectedAnswer(answer),
        []
    );

    const handleReset = useCallback(async () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setDisplayScore(false);

        await refetch();
    }, [refetch]);

    const hasError = error || data?.response_code !== 0;

    if (hasError) {
        return <Layout>Something went wrong</Layout>;
    }

    const questionDifficultyType = questionDifficultyTypes.filter(
        (type) => type?.value === currentQuestion?.difficulty
    )?.[0];

    const isLastQuestion = currentQuestionIndex === data?.results?.length - 1;

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
                {displayScore ? (
                    <Segment.Group>
                        <Segment padded="very" inverted>
                            <Header as="h2" inverted>
                                Your Score is
                            </Header>
                            <Statistic inverted>
                                <Statistic.Value>
                                    {score}/{data?.results?.length}
                                </Statistic.Value>
                                <Statistic.Label>
                                    <Rating
                                        disabled
                                        maxRating={5}
                                        defaultRating={3}
                                        icon="star"
                                        size="massive"
                                    />
                                </Statistic.Label>
                            </Statistic>
                        </Segment>
                        <Segment inverted>
                            <Button primary onClick={handleReset} size="big">
                                Try Again?
                            </Button>
                        </Segment>
                    </Segment.Group>
                ) : (
                    <Card fluid>
                        <Card.Content>
                            {questionDifficultyType && (
                                <Card.Description className={styles.difficulty}>
                                    <Label
                                        as="span"
                                        color={questionDifficultyType?.color}
                                        tag
                                    >
                                        {questionDifficultyType?.value}
                                    </Label>
                                </Card.Description>
                            )}
                            <Card.Header>
                                {he.decode(currentQuestion?.question)}
                            </Card.Header>
                            <Card.Description>
                                {currentQuestion?.category}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Question
                                question={currentQuestion}
                                onAnswerSelection={handleAnswerSelection}
                            />
                        </Card.Content>
                        <Card.Content extra textAlign="right">
                            {!isLastQuestion ? (
                                <Button
                                    icon
                                    labelPosition="right"
                                    primary
                                    onClick={handleNext()}
                                    size="big"
                                >
                                    Next
                                    <Icon name="right arrow" />
                                </Button>
                            ) : (
                                <Button
                                    icon
                                    labelPosition="right"
                                    primary
                                    onClick={handleNext(true)}
                                    size="big"
                                >
                                    End
                                    <Icon name="right arrow" />
                                </Button>
                            )}
                        </Card.Content>
                    </Card>
                )}
            </Grid>
        </Layout>
    );
};

export default withAuth(Game);
