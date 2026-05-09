import styled from 'styled-components';
import Logo from '../../assets/background-carrinho.png';
import Background from '../../assets/background-padrao.svg';

export const Container = styled.div`
    width: 100%;
    background-image: linear-gradient(
            rgba(255, 255, 255, 0.5), 
            rgba(255, 255, 255, 0.5)),
            url('${Background}');
    min-height: 100vh;
    background-color: #F0F0F0;
`;

export const Banner = styled.div`
    width: 100%;
    background: url('${Logo}');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    
    /* Desktop */
    height: 12.063rem;

    /* tablet */
    @media (min-width: 768px) and (max-width: 1024px) {
        height: 10rem;
    }

    /* Mobile */
    @media (max-width: 767px) {
        height: auto;
        aspect-ratio: 16 / 9;
        max-height: 8rem;
    }
`;

export const Title = styled.div`
    font-size: 2rem;
    font-weight: 800;
    padding-bottom: 0.75rem;
    color: #61A120;
    text-align: center;
    position: relative;

    &::after {
        position: absolute;
        bottom: 0;
        left: calc(50% - 1.75rem);
        content: '';
        width: 3.5rem;
        height: 0.25rem;
        background-color: #61A120;
    }
`;

export const Contet = styled.div`
    display: grid;
    grid-template-columns: 1fr 30%;
    width: 100%;
    max-width: 80rem;
    padding: 2.5rem;
    margin: 0 auto;
    gap: 1.25rem;

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
