import styled from 'styled-components';

export const Container = styled.div`
    display: grid;
    grid-template-columns: minmax(13.75rem, 17.5rem) 1fr;

    main {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        height: 100vh;
        background-color: ${(props) => props.theme.secondWhite};
        overflow-y: auto;
    }

    section {
        margin: 0 auto;
        padding: 2.5rem 1.25rem;
        max-width: 75rem;
        width: 100%;
    }

    /* tablet */
    @media (min-width: 768px) and (max-width: 1024px) {
        display: flex;
        flex-direction: column;
    }

    /* Mobile */
    @media (max-width: 767px) {
        display: flex;
        flex-direction: column;
    }
`;
