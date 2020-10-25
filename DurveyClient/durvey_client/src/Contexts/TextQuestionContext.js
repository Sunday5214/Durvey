import React, { useReducer, createContext, useContext } from 'react';

const initTextQuestion = {
    content:''
};

const textQuestionReducer = (state, action) => {
    switch (action.type) {
        case 'LOST_FOCUS':
            return {
                ...state,
                content: action.textContent
            };
        default:
            throw new Error('Unhandled action type');
    }
}

const TextQuestionStateContext = createContext();
const TextQuestionSetContext = createContext();

export const TextQuestionProvider = ({ children }) => {
    const [textState, textDispatch] = useReducer(textQuestionReducer, initTextQuestion);

    return (
        <TextQuestionStateContext.Provider value={textState}>
            <TextQuestionSetContext.Provider value={textDispatch}>
                {children}
            </TextQuestionSetContext.Provider>
        </TextQuestionStateContext.Provider>
    )
}

export const useTextQuestionState = () => {
    const context = useContext(TextQuestionStateContext);
    if (!context) {
        throw new Error('Cannot find Provider');
    }
    return context;
}

export const useTextQuestionSet = () => {
    const context = useContext(TextQuestionSetContext);
    if (!context) {
        throw new Error('Cannot find Provider');
    }
    return context;
}
