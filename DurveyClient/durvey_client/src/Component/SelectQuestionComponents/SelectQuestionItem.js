import React, {useState} from 'react';
import { useMakeSurveyDispatch } from '../../Contexts/MakeSurveyContext';
import { QuestionItemLayout, QuestionContent } from '../QuestionComponents/QuestionItemLayout';
import RadioButton from '../QuestionComponents/RadioButton';

let selectOption = [];

export const GetQuestionResult = () => {
    return selectOption.filter(option=>option.isChecked!==false);
}

const SelectQuestionItem = ({ content, options, questionId, isDeleteMode }) => {
    const [optionState, setOption] = useState(options);
    const onCheck = (optionIdx) =>{
        selectOption = optionState.map(option=>option.idx===optionIdx ? { ...option, isChecked: !option.isChecked } : option );
        setOption(selectOption);
    } 
    const questionsDisatch = useMakeSurveyDispatch();
    const onDeletThis = () => questionsDisatch({ type: 'DELETE_QUESTION', idx: questionId });
    return (

        <QuestionItemLayout>
            <QuestionContent clickEvent={onDeletThis} isDeleteMode={isDeleteMode}>
                {content}
            </QuestionContent>
            {optionState.map(
                (option) => {
                    return <RadioButton isChecked={option.isChecked} onClick={onCheck} optionIdx={option.idx} content={option.content} key={option.idx} />
                }
            )}
        </QuestionItemLayout>
    )
}

export default SelectQuestionItem;