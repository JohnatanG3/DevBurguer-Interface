import ReactSelect from 'react-select';
import styled from 'styled-components';
import { Button } from '../../../components/Button';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

export const Form = styled.form`
    border-radius: 1.25rem;
    background-color: ${(props) => props.theme.black};
    padding: 2rem;
    width: 100%;
    max-width: 25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

export const Label = styled.label`
    color: ${(props) => props.theme.white};
    font-size: 0.875rem;
`;

export const Input = styled.input`
    width: 100%;
    height: 3rem;
    border-radius: 5px;
    padding: 0 0.75rem;
    border: none;
`;

export const LabelUpload = styled.label`
    cursor: pointer;
    border: 2px dotted ${(props) => props.theme.white};
    border-radius: 5px;
    padding: 0.625rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.white};
    margin: 1rem 0;

    > svg {
        width: 1.5rem;
        height: 1.5rem;
        fill: ${(props) => props.theme.white};
        margin-right: 0.5rem;
    }

    input {
        display: none;
    }
`;

export const Select = styled(ReactSelect)``;

export const SubmitButton = styled(Button)`
    margin-top: 1rem;
`;

export const ErrorMessage = styled.span`
    color: ${(props) => props.theme.red};
    font-size: 0.875rem;
    line-height: 80%;
    font-weight: 600;
    text-align: center;
`;

export const ContainerCheckbox = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const InputCheckbox = styled.input`
    height: 1.25rem;
    border-radius: 5px;
    padding: 0 0.75rem;
    cursor: pointer;
`;
