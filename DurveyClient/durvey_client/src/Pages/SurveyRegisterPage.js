import React from 'react';
import './SurveyRegisterPage.scss';
import BackgroundBlock from '../Component/BackgroundBlock.js';
import OXQuestion from '../Component/OXQuestion.js';
import SelectQuestion from '../Component/SelectQuestion';
import TextQuestion from '../Component/TextQuestion';
import SurveyTitle from '../Component/SurveyTitle';
import QuestionList from '../Component/QuestionList';
import SurveySubmit from '../Component/SurveySubmit';

import '../Component/CustomCalendar/Calendar.css';
import { SelectQuestionProvider } from '../Contexts/SelectQuestionContext';
import { TextQuestionProvider } from '../Contexts/TextQuestionContext';
import { OXQuestionProvider } from '../Contexts/OXQuestionContext';
import SurveySetting from '../Component/SurveySetting';
import {getRequest} from '../Utils/RestManager';
import moment from 'moment';
import 'moment/locale/ko';
import { useMakeSurveyState } from '../Contexts/MakeSurveyContext';

const PostSurvey = async (surveyState) =>{
    return await getRequest('POST', '/survey/write', 
    {
        title: surveyState.title,
        creatorIdx: 1,
        createDatetime: moment().format('YYYY-MM-DDTHH:mm:ss'),
        startDatetime: surveyState.startDatetime,
        endDatetime: surveyState.endDatetime,
    });
}

const PostQuestions = async(registedSurveyIdx, surveyState)=>{
    await getRequest('POST', '/survey/question/write',
    {
        Questions: surveyState.questions.filter(question => question.idx !== -1),
        RegistedSurveyIdx:registedSurveyIdx
    });
}

const SurveyRegisterPage = () => {
    const surveyState = useMakeSurveyState();
    const onClick = async() => {
        const res = await PostSurvey(surveyState);
        await PostQuestions(res.data.data, surveyState);
        alert('등록 완료!');
    }

    return (
        <div className='MakeSurvey'>
            <SelectQuestionProvider>
                <TextQuestionProvider>
                    <OXQuestionProvider>
                        <BackgroundBlock widthValue='20%' heightValue='auto'>
                            <OXQuestion />
                            <TextQuestion />
                            <SelectQuestion />
                        </BackgroundBlock>
                        <BackgroundBlock widthValue='40%' heightValue='auto'>
                            <SurveyTitle />
                            <QuestionList />
                            <SurveySubmit clickEvent={onClick} widthValue='90%'>등록</SurveySubmit>
                        </BackgroundBlock>
                        <BackgroundBlock widthValue='20%' heightValue='auto'>
                            <SurveySetting/>
                        </BackgroundBlock>
                    </OXQuestionProvider>
                </TextQuestionProvider>
            </SelectQuestionProvider>
        </div>

    )
}

export default SurveyRegisterPage