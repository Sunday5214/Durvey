import React from 'react';
import './SurveyRegisterPage.scss';
import BackgroundBlock from '../Component/BackgroundBlock.js';
import OXQuestion from '../Component/OXQuestion.js';
import SelectQuestion from '../Component/SelectQuestion';
import TextQuestion from '../Component/TextQuestion';
import SurveyTitle from '../Component/SurveyTitle';

const SurveyRegisterPage = () => {
    return (
        <div className='MakeSurvey'>
            <BackgroundBlock widthValue='25%' heightValue='auto'>
                <OXQuestion/>
                <TextQuestion/>
                <SelectQuestion/>
            </BackgroundBlock>
            <BackgroundBlock widthValue='45%' heightValue='500px'>
                <SurveyTitle/>
            </BackgroundBlock>
        </div>
    )
}

export default SurveyRegisterPage