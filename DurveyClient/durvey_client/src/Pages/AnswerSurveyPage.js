import React, {useEffect, useState} from 'react';
import './AnswerSurveyPage.scss';
import {getRequest} from '../Utils/RestManager';
import SurveyItem from '../Component/SurveyItem';

const AnswerSurveyPage = () => {
    const [surveyListState, setSurveyList] = useState([]);

    useEffect(()=>{

        const getSurveyList = async() => {
            const surveyListdata = await getRequest('GET', '/survey/surveys');
            setSurveyList(surveyListdata.data.data)

        }
        getSurveyList();
    }, []);
    console.log(surveyListState);
    return (
        <div className='AnswerSurvey'>
            {
                surveyListState.map(survey=>(
                    <SurveyItem
                        key={survey.idx}
                        title={survey.title}
                        startDatetime={survey.startDatetime}
                        endDateTime={survey.endDatetime}
                    />
                ))
            }
        </div>
    )
}

export default AnswerSurveyPage;