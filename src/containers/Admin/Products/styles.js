import styled from 'styled-components';

export const Container = styled.div``;

export const ProductImage = styled.img`
    height: 5rem;
    padding: 0.75rem;
    border-radius: 1rem;
`;

export const EditButton = styled.button`
    border: none;
    background: ${(props) => props.theme.darkWhite};
    height: 2rem;
    width: 2rem;
    border-radius: 0.5rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
        height: 1.125rem;
        width: 1.125rem;
    }

    &:hover {
        background: ${(props) => props.theme.purple};

        svg {
            fill: ${(props) => props.theme.white};
        }
    }

    &:active {
        opacity: 0.8;
    }
`;
