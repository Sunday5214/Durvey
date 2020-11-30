import React from 'react';
import styled from 'styled-components';




const StyledSurveySubmitBox = styled.div`
    width: ${props=>props.widthValue};
    display: flex;
    align-self: center;
    justify-self: flex-end;
    align-items: center;
    justify-content: center;
    border-top: none;
    border-left: none;
    border-right: none;
    border-top: solid;
    border-top-color: #0088FF;
    border-top-width: 1px;
    padding: 2px 2px 2px 2px;
    margin-top: 10px;
`;

const StyledSubmitBtn = styled.button`
    width: 80px;
    height: 30px;
    border-width: 1px;
    border-color: #0088FF;
    border-style: solid;
    font-size: 20px;
    font-family: 나눔고딕;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: transparent;
    &:hover{
        color: #0088FF;
    }
`;

const SurveySubmit = ({children, clickEvent, widthValue}) => {
    return(
        <StyledSurveySubmitBox widthValue={widthValue}>
            <StyledSubmitBtn onClick={clickEvent}>
                {children}
            </StyledSubmitBtn>
        </StyledSurveySubmitBox>
    )
}

export default SurveySubmit;