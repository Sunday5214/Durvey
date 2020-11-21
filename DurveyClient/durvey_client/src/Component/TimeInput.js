import React from 'react';
import styled from 'styled-components';

const TimeInputLayout = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
`;

const InputArea = styled.textarea`
    font-family: '나눔고딕';
    width: 25px;
    height: 17px;
    resize: none;
    overflow: hidden;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: solid;
    text-align: center;
    border-color: rgba(112, 112, 112, .4);
    display: flex;
    font-size: 15px;
`;

const onlyNumber = event => {
    event = event || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;
    if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID === 8 || keyID === 46 || keyID === 37 || keyID === 39 ) 
        return;
    else
        return false;
}

const removeChar = event => {
    event = event || window.event;
    var keyID = (event.which) ? event.which : event.keyCode;
    if ( keyID === 8 || keyID === 46 || keyID === 37 || keyID === 39 ) 
        return;
    else
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
}

const TimeInput = ({onDatetimeChanged}) => {
    return(
        <TimeInputLayout>
            <InputArea onChange={onDatetimeChanged} onKeyDown={onlyNumber} onKeyUp={removeChar}/>
            <div>시</div>
            <InputArea onChange={onDatetimeChanged} onKeyDown={onlyNumber} onKeyUp={removeChar}/>
            <div>분</div>
        </TimeInputLayout>
    )
}

export default TimeInput;