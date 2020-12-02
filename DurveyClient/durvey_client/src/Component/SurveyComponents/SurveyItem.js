import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const StyledSurveyItemBox = styled.div`
    height: 270px;
    width: 340px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 30px;
    border-style: solid;
    border-color: transparent;
    border-width: 1px;
    cursor: pointer;
    &:hover{
        border-color: #0088FF;
    }
`;

const StyledSurveyItemTitle = styled.div`
    height: 80%;
    font-size: 25px;
    font-weight: bold;
    font-family: '나눔바른고딕';
    display: flex;
    word-wrap: wrap;
    margin: 14px;
    color: black;
`;

const StyledSurveyItemBottomBox = styled.div`
    height: 20%;
    display: flex;
    margin-right: 15px;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
`;

const StyledEffectiveDate = styled.div`
    font-size: 15px;
    font-family: '나눔바른고딕';
    text-align: center;
    color: black;
    opacity: 0.8;
`;

const SurveyItem = ({title, startDatetime, endDateTime, surveyIdx, onAnswerSurvey}) => {
    return(
        <StyledSurveyItemBox onClick={() => onAnswerSurvey(surveyIdx)}>
            <StyledSurveyItemTitle>{title}</StyledSurveyItemTitle>
            <StyledSurveyItemBottomBox>
                <StyledEffectiveDate>
                    시작일: {moment(startDatetime).format('YYYY년 MM월 DD일 HH:mm')} <br/> 종료일: {moment(endDateTime).format('YYYY년 MM월 DD일 HH:mm')}
                </StyledEffectiveDate>
            </StyledSurveyItemBottomBox>
        </StyledSurveyItemBox>
    )
}

export default SurveyItem;