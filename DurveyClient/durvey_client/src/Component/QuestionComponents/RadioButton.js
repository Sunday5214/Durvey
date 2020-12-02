import React from 'react';
import styled from 'styled-components';

const RadioCircle = styled.div`
    border-radius: 50%;
    background-color: ${props => props.isChecked===true ? '#0088FF' : 'white'};
    border: 1px solid #707070;
    opacity: 1;
    margin-right: 10px;
    width: 17px;
    height: 17px;
    cursor: pointer;
    &:hover{
        border-color: #0088FF;
    }
`;

const RadioContent = styled.div`
    cursor: pointer;
    font: normal normal 200 15px/35px NanumBarunGothic;
    color: #000000;
    opacity: 1;
`;

const RadioButtonLayout = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 15px;
`;

const RadioButton = ({optionIdx, content, onClick, isChecked}) => {
    return (
        <RadioButtonLayout>
            <RadioCircle onClick={()=>onClick(optionIdx)} isChecked={isChecked}/>
            <RadioContent>{content}</RadioContent>
        </RadioButtonLayout>
    )
}

export default RadioButton;
