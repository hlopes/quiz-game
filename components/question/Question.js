import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'semantic-ui-react';

import shuffle from '../../utils/shuffle';

import styles from './Question.module.css';

const questionTypes = {
    MULTIPLE: 'multiple',
    BOOLEAN: 'boolean',
};

const Question = ({ question }) => {
    if (questionTypes.MULTIPLE === question.type) {
        const answers = shuffle([
            question?.correct_answer,
            ...question?.incorrect_answers,
        ]);

        return answers.map((answer, index) => (
            <div key={index} className={styles.button}>
                <Button size="huge">{answer}</Button>
            </div>
        ));
    }

    return <div></div>;
};

Question.propTypes = {
    question: PropTypes.object,
};

export default Question;
