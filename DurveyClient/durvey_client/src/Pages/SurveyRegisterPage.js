import React from 'react';
import './SurveyRegisterPage.scss';
import BackgroundBlock from '../Component/BackgroundBlock.js';
import OXQuestion from '../Component/OXQuestion.js';
import SelectQuestion from '../Component/SelectQuestion';
import TextQuestion from '../Component/TextQuestion';
import SurveyTitle from '../Component/SurveyTitle';
import QuestionList from '../Component/QuestionList';
import SurveySubmit from '../Component/SurveySubmit';
import { SelectQuestionProvider } from '../Contexts/SelectQuestionContext';
import { TextQuestionProvider } from '../Contexts/TextQuestionContext';
import { OXQuestionProvider } from '../Contexts/OXQuestionContext';
const SurveyRegisterPage = () => {
    return (
        <div className='MakeSurvey'>
            <SelectQuestionProvider>
                <TextQuestionProvider>
                    <OXQuestionProvider>
                        <BackgroundBlock widthValue='25%' heightValue='auto'>
                            <OXQuestion />
                            <TextQuestion />
                            <SelectQuestion />
                        </BackgroundBlock>
                        <BackgroundBlock widthValue='45%' heightValue='auto'>
                            <SurveyTitle />
                            <QuestionList/>
                            <SurveySubmit/>
                        </BackgroundBlock>
                    </OXQuestionProvider>
                </TextQuestionProvider>
            </SelectQuestionProvider>
        </div>

    )
}

export default SurveyRegisterPage