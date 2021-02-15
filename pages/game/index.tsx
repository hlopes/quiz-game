import React, { FC, useState, useMemo, useCallback, useEffect } from 'react';
import useDarkMode from 'use-dark-mode';
import Image from 'next/image';
import he from 'he';
import {
    Dimmer,
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

import getQuestionImage from '@utils/getQuestionImage';
import useGetQuestions from '@helpers/useGetQuestions';
import useWithSession from '@helpers/useWithSession';
import usePlayerContext from '@helpers/usePlayerContext';
import Layout from '@components/layout/Layout';
import Question from '@components/question/Question';
import GlobalLoader from '@components/global-loader';

import {
    DifficultyLabel,
    Category,
    ImageWrapper,
    CardContent,
    CardHeader,
    StatisticValue,
} from '@theme/pages/Game.styles';

type DifficultyType = {
    color: 'red' | 'orange' | 'green';
    value: string;
    text: string;
};

const questionDifficultyTypes: DifficultyType[] = [
    {
        value: 'easy',
        color: 'green',
        text: '(1 point)',
    },
    {
        value: 'medium',
        color: 'orange',
        text: '(2 points)',
    },
    {
        value: 'hard',
        color: 'red',
        text: '(3 points)',
    },
];

const Game: FC = () => {
    useWithSession();

    const { value: isDark } = useDarkMode(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [displayScore, setDisplayScore] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);

    const { data, isLoading, updateScore } = usePlayerContext();

    const {
        refetch: refetchQuestions,
        error: getQuestionsError,
        data: getQuestionsData,
        isValidating: getQuestionsLoading,
        wasFetched: questionsFetched,
    } = useGetQuestions();

    const currentQuestion = useMemo(
        () => getQuestionsData?.results?.[currentQuestionIndex],
        [currentQuestionIndex, getQuestionsData?.results]
    );

    const player = data?.player;
    const name = data?.player?.name;
    const numQuestions = player?.preferences?.numQuestions;

    const updateFinalScore = useCallback(
        async (finalScore) => {
            await updateScore(
                name,
                finalScore,
                getQuestionsData?.results?.length
            );

            setDisplayScore(true);
        },
        [name, getQuestionsData?.results?.length, updateScore]
    );

    const handleNext = useCallback(
        (isLast) => () => {
            const isCorrect =
                selectedAnswer === currentQuestion?.correct_answer;
            setIsCorrect(isCorrect);

            let currentScore = isCorrect ? score + 1 : score;

            if (currentQuestion?.difficulty === 'medium' && isCorrect) {
                currentScore += 1;
            }

            if (currentQuestion?.difficulty === 'hard' && isCorrect) {
                currentScore += 2;
            }

            if (isCorrect) {
                setScore(currentScore);
            }

            const update = () => {
                if (!isLast) {
                    setCurrentQuestionIndex(
                        Math.min(
                            currentQuestionIndex + 1,
                            getQuestionsData?.results?.length - 1
                        )
                    );

                    setSelectedAnswer(null);

                    return setIsCorrect(null);
                }

                return updateFinalScore(currentScore);
            };

            if (!selectedAnswer) {
                update();
            } else {
                setTimeout(update, 2000);
            }
        },
        [
            selectedAnswer,
            currentQuestion?.correct_answer,
            currentQuestion?.difficulty,
            score,
            updateFinalScore,
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
        setIsCorrect(null);

        refetchQuestions(numQuestions);
    }, [refetchQuestions, numQuestions]);

    useEffect(() => {
        if (player && numQuestions && !questionsFetched) {
            refetchQuestions(numQuestions);
        }
    }, [numQuestions, refetchQuestions, questionsFetched, player]);

    const questionDifficultyType: DifficultyType = questionDifficultyTypes.filter(
        (type) => type?.value === currentQuestion?.difficulty
    )?.[0];

    const isLastQuestion =
        currentQuestionIndex === getQuestionsData?.results?.length - 1;

    const questionImage = getQuestionImage(currentQuestion?.category);

    const totalScore = getQuestionsData?.results?.reduce((result, question) => {
        if (question?.difficulty === 'medium') {
            return result + 2;
        }

        if (question?.difficulty === 'hard') {
            return result + 3;
        }

        return result + 1;
    }, 0);

    const hasError =
        getQuestionsError ||
        (getQuestionsData && getQuestionsData.response_code !== 0);

    if (isLoading || player === null) {
        return <GlobalLoader isDark={isDark} />;
    }

    if (hasError) {
        return (
            <Layout>
                <Segment inverted={isDark} padded style={{ marginTop: '2em' }}>
                    <Icon name="exclamation triangle" color="red" />
                    Something went wrong fetching the questions
                </Segment>
            </Layout>
        );
    }

    // @ts-ignore
    return getQuestionsLoading || !getQuestionsData?.results ? (
        <Dimmer active inverted={!isDark}>
            <Loader size="big">Loading</Loader>
        </Dimmer>
    ) : (
        <Layout>
            <Segment inverted={isDark} padded style={{ marginTop: '2em' }}>
                {displayScore ? (
                    <>
                        <Header as="h2">Your Score is</Header>
                        <Statistic>
                            <StatisticValue>
                                {score}/{totalScore}
                            </StatisticValue>
                            <Statistic.Label>
                                <Rating
                                    disabled
                                    maxRating={5}
                                    defaultRating={Math.floor(
                                        (score * 5) / totalScore
                                    )}
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
                    <>
                        <p>
                            Current Score:
                            <strong>{score}</strong> / Game Points:{' '}
                            <strong>{totalScore}</strong>
                        </p>
                        <Card fluid style={{ boxShadow: 'none' }}>
                            <CardContent>
                                <ImageWrapper>
                                    <Image
                                        src={questionImage}
                                        width={300}
                                        height={200}
                                    />
                                    {questionDifficultyType && (
                                        <DifficultyLabel>
                                            <Label
                                                as="span"
                                                color={
                                                    questionDifficultyType?.color
                                                }
                                                tag
                                            >
                                                {`${questionDifficultyType?.value} ${questionDifficultyType?.text}`}
                                            </Label>
                                        </DifficultyLabel>
                                    )}
                                </ImageWrapper>
                                <Category>{currentQuestion?.category}</Category>
                                <CardHeader>
                                    <Header as="h2">
                                        {he.decode(currentQuestion?.question)}
                                    </Header>
                                </CardHeader>
                            </CardContent>
                            <CardContent extra>
                                <Question
                                    question={currentQuestion}
                                    onAnswerSelection={handleAnswerSelection}
                                    isCorrect={isCorrect}
                                />
                            </CardContent>
                            <CardContent extra textAlign="right">
                                {!isLastQuestion ? (
                                    <Button
                                        icon
                                        labelPosition="right"
                                        primary
                                        onClick={handleNext(false)}
                                        size="big"
                                    >
                                        Next
                                        {/*
                                        // @ts-ignore */}
                                        <Icon name={'right arrow'} />
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
                                        {/*
                                        // @ts-ignore */}
                                        <Icon name="right arrow" />
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </>
                )}
            </Segment>
        </Layout>
    );
};

export default Game;
