import React from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { QuestionItemLayout, StyledQuestionContent } from './QuestionItemLayout';

const TextQuestionItem = ({content}) => {
    return(
        <QuestionItemLayout>
            <StyledQuestionContent>
                {content}
            </StyledQuestionContent>
            <TextareaAutosize placeholder="응답을 입력해주세요"/>
        </QuestionItemLayout>
    )
}

export default TextQuestionItem;