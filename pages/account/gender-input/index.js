import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

import styles from '../Account.module.css';

const GenderInput = ({ gender, onSetGender }) => {
    const handleGender = useCallback((gender) => () => onSetGender(gender), [
        onSetGender,
    ]);

    return (
        <Image.Group size="tiny">
            <Image
                className={gender === 'female' ? styles.selectedGender : ''}
                src={'female.png'}
                rounded
                size="mini"
                onClick={handleGender('female')}
            />
            <Image
                className={gender === 'male' ? styles.selectedGender : ''}
                src={'male.png'}
                rounded
                size="mini"
                onClick={handleGender('male')}
            />
        </Image.Group>
    );
};

GenderInput.propTypes = {
    gender: PropTypes.string,
    onSetGender: PropTypes.func,
};

export default GenderInput;
