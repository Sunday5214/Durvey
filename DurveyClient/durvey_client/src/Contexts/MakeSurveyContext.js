import React, { useReducer, useRef, createContext, useContext } from 'react';

const initSurvey = 
{
    surveyTitle: '',
    questions: 
    [
        {
            id: 0,
            questionType: 0,//0 객관식, 1 OX, 2 주관식
            questionContent:'',
            options:
            [
                {
                    optionId: 0,
                    optionContent: ''
                }
            ]
        }
    ]
}


const makeSurveyReducer = (state, action) => {
    switch(action.type){
        case 'CREATE_TEXT_QUESTION':
            return {
                ...state,
                questions: state.questions.concat(
                    {
                        id: action.id,
                        questionType: 2,
                        questionContent: action.content,
                        options: undefined
                    }
                )
            }
        case 'CREATE_OX_QUESTION':
            return {
                ...state,
                questions: state.questions.concat(
                    {
                        id: action.id,
                        questionType: 1,
                        questionContent: action.content,
                        options: 
                        [
                            {
                                optionId: 0,
                                optionContent: 'O'
                            },
                            {
                                optionId: 1,
                                optionContent: 'X'
                            }
                        ]
                    }
                )
            }
        case 'CREATE_SELECT_QUESTION':
            return {
                ...state,
                questions: state.questions.concat(
                    {
                        id: action.id,
                        questionType: 0,
                        questionContent: action.content,
                        options: action.options
                    }
                )
            }
        case 'DELETE_QUESTION':
            return{
                ...state,
                questions: state.questions.filter(question => question.id !== action.id)
            }
        case 'CANGE_TITLE':
            return{
                ...state,
                surveyTitle: action.surveyTitle
            }
        default:
            throw new Error('Unhandled action type');
    }
}

const MakeSurveyStateContext = createContext();
const MakeSurveyDispatchContext = createContext();
const MakeSurveyNextIdContext = createContext();

export const MakeSurveyProvider = ({children}) => {
    const [state, dispatch] = useReducer(makeSurveyReducer, initSurvey);
    const nextId = useRef(0);
    return (
        <MakeSurveyStateContext.Provider value={state}>
            <MakeSurveyDispatchContext.Provider value={dispatch}>
                <MakeSurveyNextIdContext.Provider value={nextId}>
                    {children}
                </MakeSurveyNextIdContext.Provider>
            </MakeSurveyDispatchContext.Provider>
        </MakeSurveyStateContext.Provider>
    )
}

export const useMakeSurveyState = () => {
    const context = useContext(MakeSurveyStateContext);
    if(!context){
        throw new Error('Cannot find Provider');
    }
    return context;
}

export const useMakeSurveyDispatch = () => {
    const context = useContext(MakeSurveyDispatchContext);
    if(!context){
        throw new Error('Cannot find Provider');
    }
    return context;
}

export const useMakeSurveyNextId = () => {
    const context = useContext(MakeSurveyNextIdContext);
    if(!context){
        throw new Error('Cannot find Provider');
    }
    return context;
}