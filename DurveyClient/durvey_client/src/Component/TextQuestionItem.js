import React from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { useMakeSurveyDispatch } from '../Contexts/MakeSurveyContext';
import { QuestionItemLayout, StyledQuestionContent } from './QuestionItemLayout';

const TextQuestionItem = ({content, questionId}) => {
    const questionsDisatch = useMakeSurveyDispatch();
    const onDeletThis = () => questionsDisatch({type:'DELETE_QUESTION', id:questionId});
    return(
        <QuestionItemLayout>
            <StyledQuestionContent>
                {content}
            </StyledQuestionContent>
            <TextareaAutosize placeholder="응답을 입력해주세요"/>
        </QuestionItemLayout>
    )
}

export default TextQuestionItem; 