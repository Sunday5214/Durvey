import React from 'react';
import styled from 'styled-components';

const RadioCircle = styled.div`
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid #0088FF;
    opacity: 1;
    &:hover{
        border-width: 3px;
    }
    &:visited{
        background: radial-gradient(#0088FF, white);
    }
`;

const RadioContent = styled.div`
    font: normal normal 200 30px/35px NanumBarunGothic;
    color: #000000;
    opacity: 1;
`;

const RadioButtonLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const RadioButton = ({ content }) => {
    return (
        <RadioButtonLayout>
            <RadioCircle />
            <RadioContent>{content}</RadioContent>
        </RadioButtonLayout>
    )
}

export default RadioButton;
