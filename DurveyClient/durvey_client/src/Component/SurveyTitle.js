import React from 'react';
import TextareaAutosize from "react-autosize-textarea"
import { useMakeSurveyDispatch, useMakeSurveyState } from '../Contexts/MakeSurveyContext';
import './SurveyTitle.scss';

const SurveyTitle = () => {
    const titleDispatch = useMakeSurveyDispatch();
    const onChangeTitle = e => titleDispatch({type:'CHANGE_TITLE', surveyTitle:e.target.value});
    return (
        <TextareaAutosize className='SurveyTitleStyle' onBlur={onChangeTitle} placeholder='제목을 입력해주세요'>
        </TextareaAutosize>
    )
}

export default SurveyTitle;