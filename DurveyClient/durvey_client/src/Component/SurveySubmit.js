import React from 'react';
import styled from 'styled-components';
import { useMakeSurveyState } from '../Contexts/MakeSurveyContext';
import {getRequest} from '../Utils/RestManager';
import moment from 'moment';
import 'moment/locale/ko';


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
    margin-top: 10px;
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

const PostSurvey = async (surveyState) =>{
    
    console.log('서버에 제출중');
    await getRequest('POST', '/survey/write', 
    {
        title: surveyState.surveyTitle,
        creatorIdx: 1,
        description: '없음',
        createDatetime: moment().format('YYYY-MM-DDTHH:mm:ss'),
        startDatetime: moment('2020-12-10T20:20:20', 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DDTHH:mm:ss'),
        endDatetime: moment('2020-12-12T20:20:20', 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DDTHH:mm:ss'),
        isAnonymous: true
    });
    console.log('끝');
}

const SurveySubmit = () => {
    const surveyState = useMakeSurveyState();
    const onClick = () => PostSurvey(surveyState);
    return(
        <StyledSurveySubmitBox>
            <StyledSubmitBtn onClick={onClick}>
                등록
            </StyledSubmitBtn>
        </StyledSurveySubmitBox>
    )
}

export default SurveySubmit;