import React from 'react';
import styled from 'styled-components';
import { useMakeSurveyState } from '../Contexts/MakeSurveyContext';
import OXQuestionItem from './OXQuestionItem';
import SelectQuestionItem from './SelectQuestionItem';
import TextQuestionItem from './TextQuestionItem';

const StyledQuestionListLayout = styled.div`
    width: 85%;
    flex-direction: column;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
`;

const QuestionList = () => {
    const questionsState = useMakeSurveyState();

    return(
        <StyledQuestionListLayout>
            {questionsState.questions.map(
                (question)=>
                {
                    switch(question.questionType){
                        case -1:
                            return <div key={question.id}></div>;
                        case 0:
                            return <SelectQuestionItem content={question.questionContent} options={question.options} questionId={question.id} key={question.id}/>
                        case 1:
                            return <OXQuestionItem content={question.questionContent} questionId={question.id} key={question.id}/>
                        case 2:
                            return <TextQuestionItem content={question.questionContent} questionId={question.id} key={question.id}/>
                        default:
                            return Error("Undefined QuestionType");
                    }
                }
            )}
        </StyledQuestionListLayout>
    )
}

export default QuestionList;