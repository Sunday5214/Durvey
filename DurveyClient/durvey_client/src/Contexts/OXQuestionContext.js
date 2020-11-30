import React, { useReducer, createContext, useContext } from 'react';

const initOXQuestion = {
    content:''
};

const oxQuestionReducer = (state, action) => {
    switch (action.type) {
        case 'LOST_FOCUS':
            return {
                ...state,
                content: action.content
            };
        default:
            throw new Error('Unhandled action type');
    }
}

const OXQuestionStateContext = createContext();
const OXQuestionSetContext = createContext();


export const OXQuestionProvider = ({ children }) => {
    const [oxState, oxDispatch] = useReducer(oxQuestionReducer, initOXQuestion);

    return (
        <OXQuestionStateContext.Provider value={oxState}>
            <OXQuestionSetContext.Provider value={oxDispatch}>
                {children}
            </OXQuestionSetContext.Provider>
        </OXQuestionStateContext.Provider>
    )
}


export const useOXQuestionState = () => {
    const context = useContext(OXQuestionStateContext);
    if (!context) {
        throw new Error('Cannot find Provider');
    }
    return context;
}

export const useOXQuestionSet = () => {
    const context = useContext(OXQuestionSetContext);
    if (!context) {
        throw new Error('Cannot find Provider');
    }
    return context;
}