import React from 'react';
import { useMakeSurveyDispatch } from '../Contexts/MakeSurveyContext';
import { QuestionItemLayout, StyledQuestionContent } from './QuestionItemLayout';
import RadioButton from './RadioButton';


const SelectQuestionItem = ({ content, options, questionId }) => {
    const questionsDisatch = useMakeSurveyDispatch();
    const onDeletThis = () => questionsDisatch({ type: 'DELETE_QUESTION', id: questionId });
    return (

        <QuestionItemLayout>
            <StyledQuestionContent>
                {content}
            </StyledQuestionContent>
            {options.map(
                (option) => {
                    return <RadioButton content={option.optionContent} key={option.optionId} />
                }
            )}
        </QuestionItemLayout>
    )
}

export default SelectQuestionItem;