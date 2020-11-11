import React from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { useTextQuestionSet, useTextQuestionState } from '../Contexts/TextQuestionContext.js';
import BackgroundBlock from './BackgroundBlock.js';
import QuestionTitle from './QuestionTitle';
import './TextQuestion.scss'
import { useMakeSurveyNextId, useMakeSurveyDispatch } from '../Contexts/MakeSurveyContext';


const TextQuestion = () => {
    const textDispatch = useTextQuestionSet();
    const textState = useTextQuestionState();
    const questionNextId = useMakeSurveyNextId();
    const questionDispatch = useMakeSurveyDispatch();
    const onFocusLost = e => textDispatch({type:'LOST_FOCUS', textContent: e.target.value});
    const onAddQuestion = () => {
        questionDispatch({type: 'CREATE_TEXT_QUESTION', id: questionNextId.current, 
        content: textState.content});
        questionNextId.current+=1;
    }
    return (
        <BackgroundBlock widthValue='90%' heightValue='auto'>
            <QuestionTitle clickEvent={onAddQuestion}>주관식 질문</QuestionTitle>
            <TextareaAutosize className='InputBox' onBlur={onFocusLost} placeholder="질문 내용을 작성해주세요"></TextareaAutosize>
        </BackgroundBlock>
    )
}

export default TextQuestion;