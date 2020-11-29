import React from 'react';
import { useMakeSurveyDispatch } from '../Contexts/MakeSurveyContext';
import { QuestionItemLayout, QuestionContent } from './QuestionItemLayout';
import RadioButton from './RadioButton';


const SelectQuestionItem = ({ content, options, questionId, isDeleteMode }) => {
    const questionsDisatch = useMakeSurveyDispatch();
    const onDeletThis = () => questionsDisatch({ type: 'DELETE_QUESTION', id: questionId });
    return (

        <QuestionItemLayout>
            <QuestionContent clickEvent={onDeletThis} isDeleteMode={isDeleteMode}>
                {content}
            </QuestionContent>
            {options.map(
                (option) => {
                    return <RadioButton content={option.optionContent} key={option.optionId} />
                }
            )}
        </QuestionItemLayout>
    )
}

export default SelectQuestionItem;