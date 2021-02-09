import React, { FC } from 'react';
import useDarkMode from 'use-dark-mode';

import Toggle from './toggle';

import { Wrapper } from './styles';

const DarkModeToggle: FC = () => {
    const { value, disable, enable, toggle } = useDarkMode(false);

    return (
        <Wrapper>
            <button type="button" onClick={disable}>
                ☀
            </button>
            <Toggle checked={value} onChange={toggle} />
            <button type="button" onClick={enable}>
                ☾
            </button>
        </Wrapper>
    );
};

export default DarkModeToggle;
