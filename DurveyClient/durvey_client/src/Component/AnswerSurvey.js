import React, {useState, useEffect} from 'react';
import {getRequest} from '../Utils/RestManager';
import SelectQuestionItem from '../Component/SelectQuestionItem';
import OXQuestionItem from '../Component/OXQuestionItem';
import TextQuestionItem from '../Component/TextQuestionItem';

const AnswerSurvey = ({surveyIdx}) => {
    console.log(surveyIdx);
    const [surveyState, setSurvey] = useState([]);
    useEffect((surveyIdx)=>{
        const getSurveyData = async(surveyIdx)=>{
            const url = '/survey/question/questions?surveyIdx='+surveyIdx;
            console.log(url)
            const surveyData = await getRequest('GET', url);
            setSurvey(surveyData);
        }
        getSurveyData();
    }, [surveyIdx]);

    return(
        <>
        {surveyState.map(
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
        </>
    )
}

export default AnswerSurvey;