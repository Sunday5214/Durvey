import React, { useReducer, useRef, createContext, useContext } from 'react';

const initQuestions = [
    {}
]

const makeSurveyReducer = (state, action) => {
    switch(action.type){
        case 'CREATE':
            return state.concat(action.question);
        case 'DELETE':
            return state.filter(question => question.id !== action.id);
        default:
            throw new Error('Unhandled action type');
    }
}

const MakeSurveyStateContext = createContext();
const MakeSurveyDispatchContext = createContext();
const MakeSurveyNextIdContext = createContext();

export const MakeSurveyProvider = ({children}) => {
    const [state, dispatch] = useReducer(makeSurveyReducer, initQuestions);
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
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export const useMakeSurveyDispatch = () => {
    const context = useContext(MakeSurveyDispatchContext);
    if(!context){
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export const useMakeSurveyNextId = () => {
    const context = useContext(MakeSurveyNextIdContext);
    if(!context){
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}