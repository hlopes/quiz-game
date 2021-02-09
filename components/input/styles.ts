import styled from '@emotion/styled';

type Props = {
    ref: any;
};

export const StyledInput = styled.input<Props>`
    box-sizing: content-box;
    width: 100%;
    height: 3rem;
    margin: 0 0 8px 0;
    padding: 0;
    font-size: 16px;
    background-color: transparent;
    border: none;
    border-bottom: 0.1rem solid #9e9e9e;
    border-radius: 0;
    outline: none;
    box-shadow: none;
    transition: box-shadow 0.3s, border 0.3s;
`;
