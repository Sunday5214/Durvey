import React, { useReducer, useRef, createContext, useContext } from 'react';

const initSurveys =
{
    surveys:
        [
            {
                createDatetime: '',
                creatorIdx: -1,
                endDatetime: '',
                idx: -1,
                startDatetime: '',
                title: ''
            }
        ]
}

const answerSurveyReducer = (state, action) => {
    switch(action.type){
        case 'LOAD_SURVEYS':
            return{
                ...state,
                surveys: action.surveys
            }
        default:
            console.log('Unhandled action type');
    }
}

const AnswerSurveyStateContext = createContext();
const AnswerSurveyDispatchContext = createContext();

export const AnswerSurveyProvider = ({children}) => {
    const [state, dispatch] = useReducer(answerSurveyReducer, initSurveys);
    return(
        <AnswerSurveyStateContext.Provider value={state}>
            <AnswerSurveyDispatchContext.Provider value={dispatch}>
                {children}
            </AnswerSurveyDispatchContext.Provider>
        </AnswerSurveyStateContext.Provider>
    )
}

export const useAnswerSurveyState = () => {
    const context = useContext(AnswerSurveyStateContext);
    if(!context){
        throw new Error('Cannot find Provider');
    }
    return context;
}

export const useAnswerSurveyDispatch = () => {
    const context = useContext(AnswerSurveyDispatchContext);
    if(!context){
        throw new Error('Cannot find Provider');
    }
    return context;
}