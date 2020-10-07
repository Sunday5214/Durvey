import React from 'react';
import HomePage from './HomePage';
import SurveyRegisterPage from './SurveyRegisterPage';

function NavigatePage({ page }) {
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