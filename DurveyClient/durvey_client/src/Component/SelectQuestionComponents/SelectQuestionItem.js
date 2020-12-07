import React, {useState} from 'react';
import { useMakeSurveyDispatch } from '../../Contexts/MakeSurveyContext';
import { QuestionItemLayout, QuestionContent } from '../QuestionComponents/QuestionItemLayout';
import RadioButton from '../QuestionComponents/RadioButton';

const SelectQuestionItem = ({addAnswer, content, options, questionIdx, isDeleteMode}) => {
    const [optionState, setOption] = useState(options);
    const onCheck = (optionIdx) =>{
        const selectOption = optionState.map(option=>option.idx===optionIdx ? { ...option, isChecked: !option.isChecked } : option );
        addAnswer({questionIdx:questionIdx, questionType:0, answer:selectOption.filter(option=>option.isChecked!==false)})
        setOption(selectOption);
    } 
    const questionsDisatch = useMakeSurveyDispatch();
    const onDeletThis = () => questionsDisatch({ type: 'DELETE_QUESTION', idx: questionIdx });
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