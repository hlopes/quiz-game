import React from 'react';

import { Wrapper, StyledInput } from './styles';

const Toggle = ({ checked, onChange }) => (
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
