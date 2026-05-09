import Select from 'react-select';
import styled from 'styled-components';

export const ProductImage = styled.img`
    height: 5rem;
    padding: 0.75rem;
    border-radius: 1rem;
`;

export const SelectStatus = styled(Select)`
    width: 15rem;
`;

export const Filter = styled.div`
    display: flex;
    justify-content: center;
    margin: 1.75rem 0;
    gap: 3.125rem;

    @media (max-width: 767px) {
        overflow-x: auto;
        justify-content: flex-start;
        gap: 1rem;
        padding: 0 1rem;

        /* scroll suave */
        -webkit-overflow-scrolling: touch;

        /* opcional: esconder scrollbar */
        &::-webkit-scrollbar {
            display: none;
        }
    }
`;

export const FilterOptions = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    color: ${(props) => (props.$isActiveStatus ? props.theme.purple : props.theme.darkGray)};
    border-bottom: ${(props) => (props.$isActiveStatus ? `2px solid ${props.theme.purple}` : 'none')};
    font-size: 1.125rem;
    line-height: 1.25rem;
    padding-bottom: 0.313rem;
    white-space: nowrap;
    flex-shrink: 0;
`;
