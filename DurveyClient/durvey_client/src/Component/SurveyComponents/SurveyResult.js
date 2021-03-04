import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getRequest } from '../../Utils/RestManager';
import SurveySubmit from './SurveySubmit';

const ModalSurveyLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const StyledTitle = styled.div`
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: solid;
    border-bottom-color: #0088FF;
    border-bottom-width: 1px;
    width: 100%;
    height: 50px;
    margin-top: 20px;
    font-size: 40px;
    font-family: 'Segoe UI';
    padding: 2px;
    text-align: center;
    align-self: center;
`

const SurveyResult = ({ surveyIdx, surveyTitle, onModalClose }) => {
    const onSubmit = () => {
        onModalClose();
    }

    useEffect(() => {
        const getSurveyResultData = async () => {
            const data = await getRequest('GET', ('/survey/result?surveyIdx=' + surveyIdx));
        }
        getSurveyResultData();
    }, [surveyIdx]);
    return (
        <ModalSurveyLayout>
            <StyledTitle>{surveyTitle}</StyledTitle>

            <SurveySubmit widthValue='100%' clickEvent={onSubmit}>나가기</SurveySubmit>
        </ModalSurveyLayout>
    )
}

export default SurveyResult;