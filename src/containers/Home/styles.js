import styled from 'styled-components';
import Background from '../../assets/background-padrao.svg';
import BannerHome from '../../assets/banner-home.png';

export const Banner = styled.div`
    width: 100%;
    background: url('${BannerHome}');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;

    h1 {
        font-family: 'Road Rage', sans-serif;
        font-size: 5.176rem;
        font-weight: 400;
        color: #FFFFFF;
        position: absolute;
        right: 10%;
        top: 10%;
    }

    /* Desktop */
    height: 30rem;

    /* tablet */
    @media (min-width: 768px) and (max-width: 1024px) {
        height: 20rem;

        h1 {
            font-size: 5rem;
            right: 5%;
            top: 5%;
        }
    }

    /* Mobile */
    @media (max-width: 767px) {
        height: auto;
        aspect-ratio: 16 / 9;
        max-height: 10.625rem;

        h1 {
            font-size: 4rem;
            right: 5%;
            top: 5%;
        }
    }
`;

export const Container = styled.section`
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.5), 
        rgba(255, 255, 255, 0.5)),
        url('${Background}');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    min-height: 100vh;
`;

export const Content = styled.div`
    /* Conteúdo principal (carrosséis, listas, etc.) */
`;
