import React from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { useOXQuestionSet, useOXQuestionState } from '../../Contexts/OXQuestionContext';
import BackgroundBlock from '../BackgroundBlock';
import './OXQuestion.scss';
import QuestionTitle from '../QuestionComponents/QuestionTitle';
import { useMakeSurveyNextId, useMakeSurveyDispatch } from '../../Contexts/MakeSurveyContext';

const OXQuestion = () => {
    const oxDispatch = useOXQuestionSet();
    const oxState = useOXQuestionState();
    const questionNextId = useMakeSurveyNextId();
    const questionDispatch = useMakeSurveyDispatch();
    const onFocusLost = e => oxDispatch({type:'LOST_FOCUS', content: e.target.value});
    const onAddQuestion = () => {
        questionDispatch({type: 'CREATE_OX_QUESTION', idx: questionNextId.current, 
        content: oxState.content});
        questionNextId.current+=1;
    }
    return (
        <BackgroundBlock widthValue='90%' heightValue='auto'>
            <QuestionTitle clickEvent={onAddQuestion}>OX 질문</QuestionTitle>
            <TextareaAutosize defaultValue='' onBlur={onFocusLost} className="InputBox" placeholder="질문 내용을 작성해주세요"></TextareaAutosize>
        </BackgroundBlock>
    )
}

export default OXQuestion;