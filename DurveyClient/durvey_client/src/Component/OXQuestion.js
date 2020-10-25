import React from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { useOXQuestionSet } from '../Contexts/OXQuestionContext';
import BackgroundBlock from './BackgroundBlock';
import './OXQuestion.scss';
import QuestionTitle from './QuestionTitle';

const OXQuestion = () => {
    const oxDispatch = useOXQuestionSet();
    const onFocusLost = e => oxDispatch({type:'LOST_FOCUS', oxContent: e.target.value});
    return (
        <BackgroundBlock widthValue='90%' heightValue='auto'>
            <QuestionTitle>OX 질문</QuestionTitle>
            <TextareaAutosize onBlur={onFocusLost} className="InputBox" placeholder="질문 내용을 작성해주세요"></TextareaAutosize>
        </BackgroundBlock>
    )
}

export default OXQuestion;