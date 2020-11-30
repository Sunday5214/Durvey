import React, { useReducer, useRef, createContext, useContext } from 'react';

const initSelectQuestion = {
    content: '',
    options: 
    [
        {
            idx:0,
            content:'',
            isChecked: false
        }
    ]
};



const selectQuestionReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_CONTENT':
            return {
                ...state,
                content: action.content
            };
        case 'CREATE_OPTIONS':
            return {
                ...state,
                options: state.options.concat({idx: action.idx, content: action.content, isChecked: false})
            }
        case 'DELETE_OPTIONS':
            return{
                ...state,
                options: state.options.filter(option => option.idx !== action.idx)
            } 
            
        case 'CHANGE_OPTIONS':
            return {
                ...state,
                options: state.options.map(option => option.idx === action.idx ? { ...option, content: action.content } : option)
            } 
           
        default:
            throw new Error('Unhandled action type');
    }
}



const SelectQuestionStateContext = createContext();
const SelectQuestionDispatchContext = createContext();
const SelectQuestionNextIdContext = createContext();



export const SelectQuestionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(selectQuestionReducer, initSelectQuestion);
    const nextId = useRef(1);

    return (
        <SelectQuestionStateContext.Provider value={state}>
            <SelectQuestionDispatchContext.Provider value={dispatch}>
                <SelectQuestionNextIdContext.Provider value={nextId}>
                    {children}
                </SelectQuestionNextIdContext.Provider>
            </SelectQuestionDispatchContext.Provider>
        </SelectQuestionStateContext.Provider>
    )
}

export const useSelectQuestionState = () => {
    const context = useContext(SelectQuestionStateContext);
    if (!context) {
        throw new Error('Cannot find Provider');
    }
    return context;
}

export const useSelectQuestionDispatch = () => {
    const context = useContext(SelectQuestionDispatchContext);
    if (!context) {
        throw new Error('Cannot find Provider');
    }
    return context;
}

export const useSelectQuestionNextId = () => {
    const context = useContext(SelectQuestionNextIdContext);
    if (!context) {
        throw new Error('Cannot find Provider');
    }
    return context;
}

