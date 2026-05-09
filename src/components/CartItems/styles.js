import styled from 'styled-components';

export const ProductImage = styled.img`
    height: 5rem;
    width: 5rem;
    border-radius: 16px;

    /* Mobile */
    @media (max-width: 767px) {
        display: none;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.875rem;
        width: 1.875rem;
        color: #FFFFFF;
        border-radius: 4px;
        background-color: #9758A6;
        border: none;
        transition: all 0.2s;
        font-weight: 600;

        &:hover {
            background-color: #7E3B8A;
        }

        &:active {
            background-color: #5C2163;
        }
    }
`;

export const EmptyCart = styled.p`
    font-size: 1.25rem;
    text-align: center;
    font-weight: bold;
    margin: 1.5rem 0;
`;

export const TotalPrice = styled.p`
    font-weight: bold;
`;

export const TrashImage = styled.img`
    height: 1.25rem;
    width: 1.25rem;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }

    &:active {
        opacity: 0.6;
    }
`;
