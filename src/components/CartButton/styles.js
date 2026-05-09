import styled from 'styled-components';

export const ContainerButton = styled.button`
    width: 100%;
    height: 3.25rem;
    border: 0;
    border-radius: 0.5rem;
    background: #9758A6;

    /* Sombra base para dar profundidade */
    box-shadow: 0 1px 0 #6F357C;

    transition: background-color 0.2s ease, box-shadow 0.08s ease, transform 0.08s ease, filter 0.2s ease;

    &:hover {
        background-color: #6F357C;
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='white' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
        border-radius: 0.5rem;
    }

    &:active {
        transform: translateY(0.25rem);
        box-shadow: 0 0 0 #6F357C;
        filter: brightness(0.9);
    }
`;
