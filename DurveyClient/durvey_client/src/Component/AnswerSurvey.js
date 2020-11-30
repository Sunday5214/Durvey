import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {getRequest} from '../Utils/RestManager';
import SelectQuestionItem from '../Component/SelectQuestionItem';
import OXQuestionItem from '../Component/OXQuestionItem';
import TextQuestionItem from '../Component/TextQuestionItem';

const ModalSurveyLayout = styled.div`
    width: 800px;
    height: 1500px;
`;

const AnswerSurvey = ({surveyIdx}) => {
    const [surveyState, setSurvey] = useState([]);
    useEffect(()=>{
        const getSurveyData = async()=>{
            const url = '/survey/question/questions?surveyIdx='+surveyIdx;
            const surveyData = await getRequest('GET', url);
            setSurvey(surveyData.data.data);
        }
        getSurveyData();
    }, [surveyIdx]);
    console.log(surveyState);
    return(
        <ModalSurveyLayout>
        {surveyState.map(
            (question)=>
            {
                switch(question.type){
                    case -1:
                        return <div key={question.idx}></div>;
                    case 0:
                        return <SelectQuestionItem isDeleteMode={false} content={question.content} options={question.options} questionIdx={question.idx} key={question.idx}/>
                    case 1:
                        return <OXQuestionItem isDeleteMode={false} options={question.options} content={question.content} questionIdx={question.idx} key={question.idx}/>
                    case 2:
                        return <TextQuestionItem isDeleteMode={false} content={question.content} questionIdx={question.idx} key={question.idx}/>
                    default:
                        return Error("Undefined QuestionType");
                }
            }
        )}
        </ModalSurveyLayout>
    )
}

export default AnswerSurvey;