import React, { useState, useCallback, useMemo } from 'react';
import he from 'he';
import { Button } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';

import shuffle from '@utils/shuffle';

const questionTypes = {
    MULTIPLE: 'multiple',
    BOOLEAN: 'boolean',
};

import { Wrapper } from './styles';

const Question = ({ question, onAnswerSelection, isCorrect }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleAnswerSelection = useCallback(
        (answer) => () => {
            setSelectedAnswer(answer);
            onAnswerSelection(answer);
        },
        [onAnswerSelection]
    );

    const answers = useMemo(() => {
        if (questionTypes.MULTIPLE === question?.type) {
            return shuffle([
                question?.correct_answer,
                ...question?.incorrect_answers,
            ]);
        }

        if (questionTypes.BOOLEAN === question?.type) {
            return ['True', 'False'];
        }

        return [];
    }, [question?.correct_answer, question?.incorrect_answers, question?.type]);

    return answers?.map((answer, index) => {
        const isAnswerSelected =
            !isEmpty(answers) &&
            selectedAnswer &&
            answers?.findIndex((answer) => answer === selectedAnswer) === index;

        const selectedProps = isAnswerSelected
            ? isCorrect
                ? {
                      color: 'green',
                  }
                : isCorrect === null
                ? {
                      color: 'blue',
                  }
                : {
                      color: 'red',
                  }
            : {};

        return (
            <Wrapper key={index}>
                {/*@ts-ignore*/}
                <Button
                    key={index}
                    id={`question-${index}`}
                    onClick={handleAnswerSelection(answer)}
                    {...selectedProps}
                >
                    {he.decode(answer)}
                </Button>
            </Wrapper>
        );
    });
};

export default Question;
