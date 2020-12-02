import React, { useState } from 'react';
import styled from 'styled-components';
import { useMakeSurveyDispatch } from '../../Contexts/MakeSurveyContext';
import { QuestionItemLayout, QuestionContent } from '../QuestionComponents/QuestionItemLayout';

let oxoOptions = [];

const StyledOXPanel = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border-width: 1px;
    border-style: solid;
    border-color: ${props=> props.isChecked===true ? '#0088FF' : '#707070'};
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

export const GetQuestionResult = () => {
    return oxoOptions.filter(option=>option.isChecked!==false);
}

const OXQuestionItem = ({ content, options, questionIdx, isDeleteMode }) => {
    const [optionState, setOption] = useState(options);
    const onCheckO = ()=>{
        oxoOptions = [...optionState];
        oxoOptions[0].isChecked = true
        if(oxoOptions[1].isChecked === true)oxoOptions[1].isChecked = false;
        setOption(oxoOptions);
    }
    const onCheckX = ()=>{
        oxoOptions = [...optionState];
        oxoOptions[1].isChecked = true
        if(oxoOptions[0].isChecked === true)oxoOptions[0].isChecked = false;
        setOption(oxoOptions);
    }
    const questionsDisatch = useMakeSurveyDispatch();
    const onDeletThis = () => questionsDisatch({type:'DELETE_QUESTION', idx:questionIdx});
    return (
        <QuestionItemLayout>
            <QuestionContent clickEvent={onDeletThis} isDeleteMode={isDeleteMode}>
                {content}
            </QuestionContent>
            <StyledPanelLayout>
                <StyledOXPanel onClick={onCheckO} isChecked={optionState[0].isChecked}
                    key={optionState[0].idx}>O</StyledOXPanel>
                <StyledOXPanel onClick={onCheckX} isChecked={optionState[1].isChecked}
                     key={optionState[1].idx}>X</StyledOXPanel>
            </StyledPanelLayout>
        </QuestionItemLayout>
    )
}

export default OXQuestionItem;