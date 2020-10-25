import React from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { useTextQuestionSet } from '../Contexts/TextQuestionContext.js';
import BackgroundBlock from './BackgroundBlock.js';
import QuestionTitle from './QuestionTitle';
import './TextQuestion.scss'



const TextQuestion = () => {
    const textDispatch = useTextQuestionSet();
    const onFocusLost = e => textDispatch({type:'LOST_FOCUS', textContent: e.target.value});
    return (
        <BackgroundBlock widthValue='90%' heightValue='auto'>
            <QuestionTitle>주관식 질문</QuestionTitle>
            <TextareaAutosize className='InputBox' onBlur={onFocusLost} placeholder="질문 내용을 작성해주세요"></TextareaAutosize>
        </BackgroundBlock>
    )
}

export default TextQuestion;