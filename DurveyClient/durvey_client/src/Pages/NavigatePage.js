import React from 'react';
import { usePageState } from '../Contexts/PageContext';
import HomePage from './HomePage';
import SurveyRegisterPage from './SurveyRegisterPage';
import AnswerSurveyPage from './AnswerSurveyPage';

const NavigatePage = () => {
    const page = usePageState();
    switch (page) {
        case '/home':
            return <HomePage />
        case '/make/survey':
            return <SurveyRegisterPage />
        case '/answer/survey':
            return <AnswerSurveyPage/>
        default:
            return <HomePage />
    }
}

export default NavigatePage;