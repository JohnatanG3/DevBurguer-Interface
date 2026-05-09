import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.header`
    background-color: #1F1F1F;
    width: 100%;
    height: 4.5rem;
    padding: 0 3.5rem;

    /* Mobile */
    @media (max-width: 600px) {
        height: auto;
        padding: 0.75rem 1rem;
    }
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 80rem;
    margin: 0 auto;

    /* Mobile: deixa quebrar em linhas */
    @media (max-width: 600px) {
        flex-wrap: wrap;
        gap: 0.75rem;
    }
`;

export const Navigation = styled.nav`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4.5rem;

    hr {
        height: 1.5rem;
        border: 1px solid #625E5E;
    }

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.25rem;
    }

    /* Mobile */
    @media (max-width: 600px) {
        height: auto;
        width: 100%;
        justify-content: flex-start;

        div {
            gap: 0.75rem;
        }

        hr {
            height: 1.2rem;
        }
    }
`;

export const Options = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;

    /* Mobile */
    @media (max-width: 600px) {
        width: 100%;
        justify-content: space-between; /* profile de um lado e carrinho do outro */
        gap: 1rem;
    }
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font: 0.875rem;

    p {
        color: #FFFFFF;
        line-height: 90%;
        font-weight: 300;

        span {
            font-weight: 700;
            color: #9758A6;
        }
    }

    /* Mobile: economiza espaço */
    @media (max-width: 600px) {
        gap: 0.5rem;

        p {
            font-size: 0.75rem;
        }
    }
`;

export const Logout = styled.button`
    color: #FF3205;
    font-weight: 700;
    text-decoration: none;
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }

    &:active {
        opacity: 0.6;
    }
`;

export const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.625rem;

    /* Mobile */
    @media (max-width: 600px) {
        gap: 0.4rem;
    }
`;

export const HeaderLink = styled(Link)`
    color: ${(props) => (props.$isActive ? '#9758A6' : '#FFFFFF')};
    border-bottom: ${(props) => (props.$isActive ? '2px solid #9758A6' : 'none')};
    padding-bottom: 0.313rem;
    text-decoration: none;
    font-size: 0.875rem;
    cursor: pointer;
    transition: color 200ms;

    &:hover {
        color: #9758A6;
    }

    &:active {
        opacity: 0.8;
    }

    /* Mobile */
    @media (max-width: 600px) {
        font-size: 0.8rem;
    }
`;
