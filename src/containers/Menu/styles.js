import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Background from '../../assets/background-padrao.svg';
import BannerMenu from '../../assets/banner-cardapio.png';

export const Banner = styled.div`
    width: 100%;
    background: url('${BannerMenu}');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: #1F1F1F;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    h1 {
        font-family: 'Road Rage', sans-serif;
        font-size: 5.176rem;
        line-height: 4.25rem;
        font-weight: 400;
        color: #FFFFFF;
        position: absolute;
        right: 10%;
        top: 10%;

    }

    span {
        display: block;
        font-size: 1.194rem;
        color: #FFFFFF;
    }

    /* Desktop */
    height: 30rem;

   /* tablet */
    @media (min-width: 768px) and (max-width: 1024px) {
        height: 19rem;

        h1 {
            right: 10%;
            top: 10%;
        }

        span {
            font-size: 1.194rem;
        }
    }

    /* Mobile */
    @media (max-width: 767px) {
        height: auto;
        aspect-ratio: 3 / 4;

        max-height: 230px;

        h1 {
            right: 3%;
            top: 20%;
            font-size: 2.5rem;
            line-height: 2.188rem;
        }

        span {
            font-size: 0.9rem;
        }
    }
`;

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('${Background}');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`;

export const CategoryMenu = styled.div`
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-top: 2rem;

    /* tablet */
    @media (min-width: 768px) and (max-width: 1024px) {
        justify-content: center;
        gap: 1.25rem;

        padding: 0 1rem;
        overflow-x: auto;
        white-space: nowrap;

        /* melhora o scroll no iOS */
        -webkit-overflow-scrolling: touch;

        /* “esconde” scrollbar */
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }
`;

export const CategoryButton = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    background: none;
    color: ${(props) => (props.$isActiveCategory ? '#9758A6' : '#9A9A9D')};
    font-size: 1.5rem;
    font-weight: 600;
    padding-bottom: 0.313rem;
    line-height: 1.25rem;
    border: none;
    border-bottom: ${(props) => props.$isActiveCategory && '3px solid #9758A6'} ;

   /* Mobile */
    @media (max-width: 767px) {
        font-size: 1rem;
        line-height: 1.1rem;
        justify-content: flex-start;
    }
`;

export const ProductsGrid = styled.div`
    max-width: 1280px;
    margin: 0 auto;

    display: grid;
    grid-template-columns: repeat(4, minmax(220px, 1fr));
    gap: 2rem;
    padding: 4rem 2rem;

    @media (max-width: 1100px) {
        grid-template-columns: repeat(3, minmax(220px, 1fr));
    }

    @media (max-width: 850px) {
        grid-template-columns: repeat(2, minmax(220px, 1fr));
    }

    @media (max-width: 520px) {
        grid-template-columns: 1fr;
    }
`;

export const ProductCard = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1; /* ocupa o meio */
`;

export const ButtonWrapper = styled.div`
    margin-top: auto; /* empurra pro final */
`;
