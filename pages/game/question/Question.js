import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import he from 'he';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';

import { Button } from 'semantic-ui-react';

import useBreakpoints from '../../../common/useBreakpoints';
import shuffle from '../../../utils/shuffle';

import styles from './Question.module.css';

const questionTypes = {
    MULTIPLE: 'multiple',
    BOOLEAN: 'boolean',
};

const Question = ({ question, onAnswerSelection }) => {
    const { isExtraSmall } = useBreakpoints();
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
    }, [question?.correct_answer, question?.incorrect_answers, question?.type]);

    return answers.map((answer, index) => {
        const isAnswerSelected =
            !isEmpty(answers) &&
            selectedAnswer &&
            answers?.findIndex((answer) => answer === selectedAnswer) === index;

        const selectedProps = isAnswerSelected
            ? {
                  color: 'blue',
              }
            : {};

        return (
            <div
                key={index}
                className={classnames(styles.button, {
                    [styles.mobile]: isExtraSmall,
                })}
            >
                <Button
                    id={`question-${index}`}
                    className={styles.button}
                    size="large"
                    onClick={handleAnswerSelection(answer)}
                    {...selectedProps}
                >
                    {he.decode(answer)}
                </Button>
            </div>
        );
    });
};

Question.propTypes = {
    question: PropTypes.object,
    onAnswerSelection: PropTypes.func,
};

export default Question;
