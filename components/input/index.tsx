import React, { FC, ForwardedRef, forwardRef } from 'react';

import { StyledInput } from './styles';

type Props = {
    ref: ForwardedRef<HTMLInputElement>;
    name: string;
    placeholder: string;
    type?: string;
};

const Input: FC<Props> = forwardRef(
    ({ ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => {
        return <StyledInput ref={ref} {...props} />;
    }
);

Input.displayName = 'Input';

export default Input;
