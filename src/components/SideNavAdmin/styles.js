import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: ${(props) => props.theme.black};

    img {
        width: 60%;
        margin: 2rem 0
    }

    /* tablet */
    @media (min-width: 768px) and (max-width: 1024px) {
        height: auto;
    }

    /* Mobile */
    @media (max-width: 767px) {
        height: auto;
    }
`;

export const NavLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.25rem;
    text-decoration: none;
    color: ${(props) => props.theme.white};
    transition: 3ms ease-in-out;
    background-color: ${(props) => (props.$isActive ? props.theme.purple : 'transparent')};

    &:hover {
        background-color: ${(props) => props.theme.purple};
    }

    &:active {
        opacity: 0.7;
    }
`;

export const Footer = styled.footer`
    width: 100%;
    margin-top: auto;
`;
