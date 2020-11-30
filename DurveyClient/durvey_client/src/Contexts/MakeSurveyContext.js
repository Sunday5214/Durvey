import React, { useReducer, useRef, createContext, useContext } from 'react';
import moment from 'moment';
const initSurvey = 
{
    title: '',
    startDatetime: moment().format('YYYY-MM-DDTHH:mm'),
    endDatetime: moment().format('YYYY-MM-DDTHH:mm'),
    questions: 
    [
        {
            idx: -1,
            type: -1,//0 객관식, 1 OX, 2 주관식
            content:'',
            options:
            [
                {
                    idx: 0,
                    content: '',
                    isChecked: false
                }
            ]
        }
    ]
}


const makeSurveyReducer = (state, action) => {
    console.log(state);
    switch(action.type){
        case 'CREATE_TEXT_QUESTION':
            return {
                ...state,
                questions: state.questions.concat(
                    {
                        idx: action.idx,
                        type: 2,
                        content: action.content,
                        options: undefined
                    }
                )
            }
        case 'CREATE_OX_QUESTION':
            return {
                ...state,
                questions: state.questions.concat(
                    {
                        idx: action.idx,
                        type: 1,
                        content: action.content,
                        options: 
                        [
                            {
                                idx: 0,
                                content: 'O',
                                isChecked: false
                            },
                            {
                                idx: 1,
                                content: 'X',
                                isChecked: false
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
                        idx: action.idx,
                        type: 0,
                        content: action.content,
                        options: action.options
                    }
                )
            }
        case 'DELETE_QUESTION':
            return{
                ...state,
                questions: state.questions.filter(question => question.idx !== action.idx)
            }
        case 'CHANGE_TITLE':
            return{
                ...state,
                title: action.title
            }
        case 'CHANGE_START_DATETIME':
            return{
                ...state,
                startDatetime: action.startDatetime
            }
        case 'CHANGE_END_DATETIME':
            return{
                ...state,
                endDatetime: action.endDatetime
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