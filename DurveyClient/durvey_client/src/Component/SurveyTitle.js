import React from 'react';
import TextareaAutosize from "react-autosize-textarea"
import './SurveyTitle.scss';

const SurveyTitle = () => {
    return (
        <TextareaAutosize className='SurveyTitleStyle' placeholder='제목을 입력해주세요'>
        </TextareaAutosize>
    )
}

export default SurveyTitle;