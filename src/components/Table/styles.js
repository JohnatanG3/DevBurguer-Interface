import styled from 'styled-components';

export const Root = styled.table`
    width: 100%;
    min-width: 43.75rem;
    border-collapse: collapse;
    background-color: #FFFFFF;
    border-radius: 20px;

    @media (max-width: 767px) {
        min-width: 35rem;
    }
`;

export const Header = styled.thead``;

export const Tr = styled.tr``;

export const Th = styled.th`
    padding: 1rem;
    text-align: center;
    background-color: #484848;
    color: #FFFFFF;
    border-bottom: 1px solid #CDCDCD;
    font-weight: bold;

    &:first-child {
        border-top-left-radius: 20px;
    }

    &:last-child {
        border-top-right-radius: 20px;
    }
`;

export const Td = styled.td`
    padding: 1rem;
    color: #484848;
    font-weight: 500;
    line-height: 115%;
    text-align: center;
`;

export const Body = styled.tbody``;
