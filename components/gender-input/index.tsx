import React, { useCallback } from 'react';
import { Image } from 'semantic-ui-react';

import { SelectedImage } from './styles';

const GenderInput = ({ gender, onSetGender }) => {
    const handleGender = useCallback((gender) => () => onSetGender(gender), [
        onSetGender,
    ]);

    return (
        <Image.Group size="tiny">
            {gender === 'female' ? (
                <SelectedImage
                    src={'female.png'}
                    rounded
                    size="mini"
                    onClick={handleGender('female')}
                />
            ) : (
                <Image
                    src={'female.png'}
                    rounded
                    size="mini"
                    onClick={handleGender('female')}
                />
            )}
            {gender === 'male' ? (
                <SelectedImage
                    src={'male.png'}
                    rounded
                    size="mini"
                    onClick={handleGender('male')}
                />
            ) : (
                <Image
                    src={'male.png'}
                    rounded
                    size="mini"
                    onClick={handleGender('male')}
                />
            )}
        </Image.Group>
    );
};

export default GenderInput;
