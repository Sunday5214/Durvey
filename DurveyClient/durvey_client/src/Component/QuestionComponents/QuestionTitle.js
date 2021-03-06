import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.div`
    font-size: 20px;
    font-family: 나눔스퀘어_ac;
    width: 80%;
    margin-left: 10px;
    margin-top: 10px;
    justify-content: flex-start;
    justify-self: flex-start;
`;

const TitleLayout = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    color: black;
`;

const AddButton = styled.button`
    width: 100px;
    font-size: 15px;
    background-color: transparent;
    border-style: solid;
    border-width: 1px;
    border-color: #0088FF;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-right: 10px;
    padding: 2px;
    opacity: 1;
    cursor: pointer;
    &:hover{
        color: #0088FF;
    }
`;

const QuestionTitle = ({children, clickEvent}) => {
    return (
        <TitleLayout>
            <StyledTitle>{children}</StyledTitle>
            <AddButton onClick={clickEvent}>
                설문에 추가
            </AddButton>
        </TitleLayout>

    )
}

export default QuestionTitle;