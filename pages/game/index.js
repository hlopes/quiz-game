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
    Image,
} from 'semantic-ui-react';

import getQuestionImage from '../../utils/getQuestionImage';
import withAuth from '../../common/withAuth';
import useQuestions from '../../common/useQuestions';
import Layout from '../../components/layout/Layout';
import Question from '../../components/question/Question';

import useSetScore from '../../common/useSetScore';

import useUserContext from '../../common/useUserContext';

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
    const {
        user: { email },
    } = useUserContext();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [displayScore, setDisplayScore] = useState(false);

    const {
        error: getQuestionsError,
        data: getQuestionsData,
        isLoading: getQuestionsLoading,
        refetch,
    } = useQuestions();

    const [setScoreAPI] = useSetScore();

    const currentQuestion = useMemo(
        () => getQuestionsData?.results?.[currentQuestionIndex],
        [currentQuestionIndex, getQuestionsData?.results]
    );

    const updateScore = useCallback(
        async (finalScore) => {
            await setScoreAPI({
                email,
                points: finalScore,
                questions: getQuestionsData?.results?.length,
            });

            setDisplayScore(true);
        },
        [email, getQuestionsData?.results?.length, setScoreAPI]
    );

    const handleNext = useCallback(
        (isLast) => () => {
            const isCorrect =
                selectedAnswer === currentQuestion?.correct_answer;
            const currentScore = isCorrect ? score + 1 : score;

            if (isCorrect) {
                setScore(currentScore);
            }

            if (!isLast) {
                return setCurrentQuestionIndex(
                    Math.min(
                        currentQuestionIndex + 1,
                        getQuestionsData?.results?.length - 1
                    )
                );
            }

            return updateScore(currentScore);
        },
        [
            selectedAnswer,
            currentQuestion?.correct_answer,
            updateScore,
            score,
            currentQuestionIndex,
            getQuestionsData?.results?.length,
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

    const hasError =
        getQuestionsError ||
        (getQuestionsData && getQuestionsData.response_code !== 0);

    if (hasError) {
        return <Layout>Something went wrong</Layout>;
    }

    const questionDifficultyType = questionDifficultyTypes.filter(
        (type) => type?.value === currentQuestion?.difficulty
    )?.[0];

    const isLastQuestion =
        currentQuestionIndex === getQuestionsData?.results?.length - 1;

    const questionImage = getQuestionImage(currentQuestion?.category);

    return getQuestionsLoading || !getQuestionsData?.results ? (
        <Dimmer active inverted>
            <Loader size="big">Loading</Loader>
        </Dimmer>
    ) : (
        <Layout>
            <Segment padded style={{ marginTop: '2em' }}>
                {displayScore ? (
                    <>
                        <Header as="h2">Your Score is</Header>
                        <Statistic>
                            <Statistic.Value>
                                {score}/{getQuestionsData?.results?.length}
                            </Statistic.Value>
                            <Statistic.Label>
                                <Rating
                                    disabled
                                    maxRating={5}
                                    defaultRating={score / 2}
                                    icon="star"
                                    size="massive"
                                />
                            </Statistic.Label>
                        </Statistic>
                        <div>
                            <Button primary onClick={handleReset} size="big">
                                Try Again?
                            </Button>
                        </div>
                    </>
                ) : (
                    <Card fluid style={{ boxShadow: 'none' }}>
                        <Card.Content>
                            <Image src={questionImage} size="medium" />
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
                            <Card.Header className={styles.question}>
                                <Header as="h2">
                                    {he.decode(currentQuestion?.question)}
                                </Header>
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
            </Segment>
        </Layout>
    );
};

export default withAuth(Game);
