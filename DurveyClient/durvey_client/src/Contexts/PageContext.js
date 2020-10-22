import React, { useReducer, createContext, useContext } from 'react';

let page = "/home";
const pageReducer = (state, action) => {
    switch (action.type) {
        case 'GET':
            return state;
        case 'CHANGE':
            state = action.link;
            return state
        default:
            throw new Error('Unhandled action');
    }
}

const PageStateContext = createContext();
const PageDispatchContext = createContext();



export const PageProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pageReducer, page);
    return (

        <PageStateContext.Provider value={state}>
            <PageDispatchContext.Provider value={dispatch}>
                {children}
            </PageDispatchContext.Provider>
        </PageStateContext.Provider>
    )
}

export const usePageState = () => {
    const context = useContext(PageStateContext);
    if (!context) {
        throw new Error('Cannot find PageProvider');
    }
    return context;
}

export const usePageDispatch = () =>{
    const context = useContext(PageDispatchContext);
    if (!context) {
        throw new Error('Cannot find PageProvider');
    }
    return context;
}