import React from 'react';
import { usePageState } from '../Contexts/PageContext';
import HomePage from './HomePage';
import SurveyRegisterPage from './SurveyRegisterPage';

const NavigatePage = () => {
    const page = usePageState();
    switch (page) {
        case '/home':
            return <HomePage />
        case '/make/survey':
            return <SurveyRegisterPage />
        default:
            return <HomePage />
    }
}

export default NavigatePage;