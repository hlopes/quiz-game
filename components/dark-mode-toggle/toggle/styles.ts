import styled from '@emotion/styled';

export const Wrapper = styled.span`
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 0.4rem;
`;

export const StyledInput = styled.input`
    position: relative;
    width: 4rem;
    height: 1rem;
    background: #555;
    border-radius: 0.5rem;
    outline: none;
    cursor: pointer;
    appearance: none;

    & + label {
        position: absolute;
        left: 0.2rem;
        display: inline-block;
        width: 1.8rem;
        height: 1.8rem;
        background-color: #f6f6f6;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0.9;
        transition: all 0.3s ease;
    }

    &:checked + label {
        left: 3rem;
    }

    &:focus-visible {
        outline: solid 0.2rem white;
    }
`;
