import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getRequest } from '../../Utils/RestManager';
import SelectQuestionItem from '../../Component/SelectQuestionComponents/SelectQuestionItem';
import OXQuestionItem from '../../Component/OXQuestionComponents/OXQuestionItem';
import TextQuestionItem from '../../Component/TextQuestionComponents/TextQuestionItem';
import SurveySubmit from './SurveySubmit';

const ModalSurveyLayout = styled.div`
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const StyledTitle = styled.div`
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: solid;
    border-bottom-color: #0088FF;
    border-bottom-width: 1px;
    width: 110%;
    height: 50px;
    margin-top: 20px;
    font-size: 40px;
    font-family: 'Segoe UI';
    text-align: center;
    align-self: center;
`


const AnswerSurvey = ({ surveyIdx, surveyTitle }) => {
    const [surveyState, setSurvey] = useState([]);
    const onSubmit = () => {
        alert('제출되었습니다!');
    }
    useEffect(() => {
        const getSurveyData = async () => {
            const url = '/survey/question/questions?surveyIdx=' + surveyIdx;
            const surveyData = await getRequest('GET', url);
            setSurvey(surveyData.data.data);
        }
        getSurveyData();
    }, [surveyIdx]);
    return (
        <ModalSurveyLayout>
            <StyledTitle>{surveyTitle}</StyledTitle>
            {surveyState.map(
                (question) => {
                    switch (question.type) {
                        case -1:
                            return <div key={question.idx}></div>;
                        case 0:
                            return <SelectQuestionItem isDeleteMode={false} content={question.content} options={question.options} questionIdx={question.idx} key={question.idx} />
                        case 1:
                            return <OXQuestionItem isDeleteMode={false} options={question.options} content={question.content} questionIdx={question.idx} key={question.idx} />
                        case 2:
                            return <TextQuestionItem isDeleteMode={false} content={question.content} questionIdx={question.idx} key={question.idx} />
                        default:
                            return Error("Undefined QuestionType");
                    }
                }
            )}
            <SurveySubmit widthValue='110%' clickEvent={onSubmit}>제출</SurveySubmit>
        </ModalSurveyLayout>
    )
}

export default AnswerSurvey;