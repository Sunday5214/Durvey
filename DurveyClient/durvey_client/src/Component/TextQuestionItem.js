import React from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { useMakeSurveyDispatch } from '../Contexts/MakeSurveyContext';
import { QuestionItemLayout, QuestionContent } from './QuestionItemLayout';
import './TextQuestionItem.scss';

const TextQuestionItem = ({content, questionId, isDeleteMode}) => {
    const questionsDisatch = useMakeSurveyDispatch();
    const onDeletThis = () => questionsDisatch({type:'DELETE_QUESTION', id:questionId});
    return(
        <QuestionItemLayout>
            <QuestionContent clickEvent={onDeletThis} isDeleteMode={isDeleteMode}>
                {content}
            </QuestionContent>
            <TextareaAutosize className='InputBox' placeholder='응답을 입력해주세요'/>
        </QuestionItemLayout>
    )
}

export default TextQuestionItem; 