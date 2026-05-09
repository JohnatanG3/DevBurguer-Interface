import styled from 'styled-components';

export const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;

    color: #9758A6;
    font-size: 1.2rem;
    font-weight: 600;

    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;

    margin: 1.5rem 0;

    &:hover {
        text-decoration: underline;
    }

    &:active {
        opacity: 0.6;
    }
`;
