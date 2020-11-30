import React, { useReducer, useRef, createContext, useContext } from 'react';

const initSurvey =
{
    questions: [
        {
            idx: -1,
            content: '',
            questionType: -1,
            options: 
            [
                {
                    idx: -1,
                    content: '',
                    questionIdx: '',
                    number: -1,
                    selectCount: -1,
                    isChecked: false
                }
            ]
        }
    ]
    
}


const answerSurveyReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_QUESTIONS':
            return {
                ...state,
                questions: action.Data
            };
        default:
            console.log('Unhandled action type');
    }
}

const AnswerSurveyStateContext = createContext();
const AnswerSurveyDispatchContext = createContext();

export const AnswerSurveyProvider = ({ children }) => {
    const [state, dispatch] = useReducer(answerSurveyReducer, initSurvey);
    return (
        <AnswerSurveyStateContext.Provider value={state}>
            <AnswerSurveyDispatchContext.Provider value={dispatch}>
                {children}
            </AnswerSurveyDispatchContext.Provider>
        </AnswerSurveyStateContext.Provider>
    )
}

export const useAnswerSurveyState = () => {
    const context = useContext(AnswerSurveyStateContext);
    if (!context) {
        throw new Error('Cannot find Provider');
    }
    return context;
}

export const useAnswerSurveyDispatch = () => {
    const context = useContext(AnswerSurveyDispatchContext);
    if (!context) {
        throw new Error('Cannot find Provider');
    }
    return context;
}