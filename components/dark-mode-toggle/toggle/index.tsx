import React, { FC } from 'react';

import { Wrapper, StyledInput } from './styles';

type ToggleProps = {
    checked: boolean;
    onChange: () => void;
};

const Toggle: FC<ToggleProps> = ({ checked, onChange }: ToggleProps) => (
    <Wrapper className="toggle-control">
        <StyledInput
            id="dmcheck"
            className="dmcheck"
            type="checkbox"
            checked={checked}
            onChange={onChange}
        />
        <label htmlFor="dmcheck" />
    </Wrapper>
);

export default Toggle;
