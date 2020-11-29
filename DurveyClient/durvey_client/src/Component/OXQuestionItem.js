import React from 'react';
import styled from 'styled-components';
import { useMakeSurveyDispatch } from '../Contexts/MakeSurveyContext';
import { QuestionItemLayout, QuestionContent } from './QuestionItemLayout';

const StyledOXPanel = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #707070;
    opacity: 1;
    font-size: 40px;
    font-weight: bold;
    color: #0088FF;
    &:hover{
        border-color: #0088FF;
    }
    cursor: pointer;
    margin: 1px 1px 1px 1px;
`;
const StyledPanelLayout = styled.div`
    margin-left: 15px;
    flex-direction: row;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
`;

const OXQuestionItem = ({ content, questionId, isDeleteMode }) => {
    const questionsDisatch = useMakeSurveyDispatch();
    const onDeletThis = () => questionsDisatch({type:'DELETE_QUESTION', id:questionId});
    return (
        <QuestionItemLayout>
            <QuestionContent clickEvent={onDeletThis} isDeleteMode={isDeleteMode}>
                {content}
            </QuestionContent>
            <StyledPanelLayout>
                <StyledOXPanel>O</StyledOXPanel>
                <StyledOXPanel>X</StyledOXPanel>
            </StyledPanelLayout>
        </QuestionItemLayout>
    )
}

export default OXQuestionItem;