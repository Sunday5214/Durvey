import React from 'react';
import styled from 'styled-components';

const StyledSurveySubmitBox = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: none;
    border-left: none;
    border-right: none;
    border-top: solid;
    border-top-color: #0088FF;
    border-top-width: 1px;
    padding: 2px 2px 2px 2px;
`;

const StyledSubmitBtn = styled.button`
    width: 60px;
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

const SurveySubmit = () => {
    return(
        <StyledSurveySubmitBox>
            <StyledSubmitBtn>
                등록
            </StyledSubmitBtn>
        </StyledSurveySubmitBox>
    )
}

export default SurveySubmit;