import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';
import BackgrounLeft from '../../assets/background-login-left.png';
import BackgroundRight from '../../assets/background-login-right.svg';

export const Container = styled.div`
    display: flex;
    min-height: 100dvh;
    width: 100%;
    overflow-x: hidden;

    /* Desktop padrão */
    flex-direction: row;

    /* tablet */
    @media (min-width: 768px) and (max-width: 1024px) {
        flex-direction: column;
        overflow-y: auto;
    }

    /* Mobile */
    @media (max-width: 767px) {
        flex-direction: column;
    }
`;

export const LeftContainer = styled.div`
    background-image: url('${BackgrounLeft}');
    background-size: cover;
    background-position: center;
    flex: 1;

    /* Tablet: vira "banner" menor em cima */
    @media (min-width: 768px) and (max-width: 1024px) {
        flex: none;
        height: 45dvh; /* ajuste fino: 30~45dvh */
    }

    /* Mobile: some */
    @media (max-width: 767px) {
        display: none;
    }
`;

export const RightContainer = styled.div`
    background-image: url('${BackgroundRight}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    flex: 1;
    background-color: #373737;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    padding: 2.5rem;
    gap: 1.25rem;

    p {
        color: #FFF;
        font-size: 0.9rem;
        font-weight: 600;
        text-align: center;
    }

    /* Tablet: ocupa o resto */
    @media (min-width: 768px) and (max-width: 1024px) {
        flex: none;
        min-height: 55dvh;
        padding: 2rem 1.5rem;
    }

    /* Mobile: ocupa 100% da tela */
    @media (max-width: 767px) {
        flex: none;
        min-height: 100dvh;
        padding: 1.5rem 1.25rem;
    }
`;

export const Title = styled.h2`
    font-family: 'Road Rage', sans-serif;
    font-size: 2.5rem;
    color: #fff;
    text-align: center;

    span {
        font-family: 'Road Rage', sans-serif;
        color: #9758A6;
    }
   
    /* Mobile: letra com tamanho perfeito*/
    @media (max-width: 767px) {
        font-size: 2.4rem;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.25rem;
    width: 100%;
    max-width: 25rem;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.313rem;
    width: 100%;

    input {
        width: 100%;
        border: none;
        height: 3.25rem;
        border-radius: 0.313rem;
        padding: 0 1rem;
    }

    label {
        font-size: 1.125rem;
        font-weight: 600;
        color: #fff;
    }

    p {
        font-size: 0.875rem;
        text-align: center;
        line-height: 80%;
        color: #CE2029;
        margin-top: 0.313rem;
        font-weight: 600;
        height: 0.625rem;
    }
`;

export const PasswordWrapper = styled.div`
    position: relative;
    width: 100%;
`;

export const TogglePasswordButton = styled.button`
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    color: #9758a6;

    &:hover {
        color: #b06ac3;
    }
`;

export const Link = styled(ReactLink)`
    text-decoration: none;
    color: #fff;
    text-align: center;

    &:hover {
        opacity: 0.9;
    }

    &:active {
        opacity: 0.8;
    }
`;
