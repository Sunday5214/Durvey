import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getRequest } from '../../Utils/RestManager';
import OXQuestionItem from '../../Component/OXQuestionComponents/OXQuestionItem';
import SelectQuestionItem from '../../Component/SelectQuestionComponents/SelectQuestionItem';
import TextQuestionItem from '../../Component/TextQuestionComponents/TextQuestionItem';
import SurveySubmit from './SurveySubmit';

const ModalSurveyLayout = styled.div`
    width: 100%;
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
    width: 100%;
    height: 50px;
    margin-top: 20px;
    font-size: 40px;
    font-family: 'Segoe UI';
    padding: 2px;
    text-align: center;
    align-self: center;
`

const AnswerSurvey = ({ surveyIdx, surveyTitle }) => {
    const [surveyState, setSurvey] = useState([]);
    const answerList = [];
    const onSubmit = async () => {
        let submitObj = [];
        for(let idx in answerList){
            if(Array.isArray(answerList[idx].answer)){
                if(answerList[idx].answer.length > 1){
                    for(let i=0; i<answerList[idx].answer.length; i++){
                        submitObj.push(
                            {
                                QuestionIdx: answerList[idx].questionIdx,
                                AnswerUserIdx: 1,
                                AnswerText: null,
                                AnswerNumber: answerList[idx].answer[i].number,
                                QuestionType: answerList[idx].questionType
                            }
                        )
                    }
                }
                else{
                    submitObj.push(
                        {
                            QuestionIdx: answerList[idx].questionIdx,
                            AnswerUserIdx: 1,
                            AnswerText: null,
                            AnswerNumber: answerList[idx].answer[0].number,
                            QuestionType: answerList[idx].questionType
                        }
                    )
                }
            }
            else{
                submitObj.push(
                    {
                        QuestionIdx: answerList[idx].questionIdx,
                        AnswerUserIdx: 1,
                        AnswerText: answerList[idx].answer,
                        AnswerNumber: null,
                        QuestionType: answerList[idx].questionType
                    }
                )
            }
        }
        const surveyAnswerData = {SurveyIdx:surveyIdx, SurveyResults:submitObj};
        console.log(surveyAnswerData);
        const result = await getRequest('POST', '/survey/submit', surveyAnswerData);
        console.log(result);
    }
    const onAddAnswer = (answerData) => {
        const idx = answerList.findIndex(answer=>answer.questionIdx===answerData.questionIdx);
        if(idx === -1){
            answerList.push(answerData);
        }
        else{
            answerList[idx]=answerData;
        }
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
                            return <SelectQuestionItem addAnswer={onAddAnswer} isDeleteMode={false} content={question.content} options={question.options} questionIdx={question.idx} key={question.idx} />
                        case 1:
                            return <OXQuestionItem addAnswer={onAddAnswer} isDeleteMode={false} options={question.options} content={question.content} questionIdx={question.idx} key={question.idx} />
                        case 2:
                            return <TextQuestionItem addAnswer={onAddAnswer} isDeleteMode={false} content={question.content} questionIdx={question.idx} key={question.idx} />
                        default:
                            return Error("Undefined QuestionType");
                    }
                }
            )}
            <SurveySubmit widthValue='100%' clickEvent={onSubmit}>제출</SurveySubmit>
        </ModalSurveyLayout>
    )
}

export default AnswerSurvey;