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

const SurveyRegisterPage = () => {
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
                            <SurveySubmit />
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