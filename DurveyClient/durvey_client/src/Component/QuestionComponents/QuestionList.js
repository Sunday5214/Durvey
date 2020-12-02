import React from 'react';
import styled from 'styled-components';
import { useMakeSurveyState } from '../../Contexts/MakeSurveyContext';
import OXQuestionItem from '../../Component/OXQuestionComponents/OXQuestionItem';
import SelectQuestionItem from '../SelectQuestionComponents/SelectQuestionItem';
import TextQuestionItem from '../TextQuestionComponents/TextQuestionItem';

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
                    switch(question.type){
                        case -1:
                            return <div key={question.idx}></div>;
                        case 0:
                            return <SelectQuestionItem content={question.content} options={question.options} questionIdx={question.idx} key={question.idx}/>
                        case 1:
                            return <OXQuestionItem content={question.content} options={question.options} questionIdx={question.idx} key={question.idx}/>
                        case 2:
                            return <TextQuestionItem content={question.content} questionIdx={question.idx} key={question.idx}/>
                        default:
                            return Error("Undefined QuestionType");
                    }
                }
            )}
        </StyledQuestionListLayout>
    )
}

export default QuestionList;