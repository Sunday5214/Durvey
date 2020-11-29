import styled from 'styled-components';
import React from 'react';
import { MdRemoveCircleOutline } from 'react-icons/md';

export const QuestionItemLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: transparent;
    margin-top: 20px;
    margin-bottom: 10px;
    
`;

const StyledQuestionContent = styled.div`
    font: normal normal 200 20px/40px NanumBarunGothic;
    opacity: 1;
    color: #000000;
`;

const StyledQuestionContentLayout = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const StyledDeleteQuestionIcon = styled.div`
    font-size: 20px;
    margin-left: 5px;
    display: flex;
    align-items: center;
    color: rgb(255, 0, 30);
    cursor: pointer;
    &:hover{
        font-size:25px;
    }
`;

export const QuestionContent = ({ children, clickEvent, isDeleteMode }) => {
    return (
        <StyledQuestionContentLayout>
            <StyledQuestionContent>
                {children}
            </StyledQuestionContent>
            {
                isDeleteMode ? 
                <StyledDeleteQuestionIcon>
                    <MdRemoveCircleOutline onClick={clickEvent}/>
                </StyledDeleteQuestionIcon>
                :
                null
            }            
        </StyledQuestionContentLayout>
    )
}

QuestionContent.defaultProps = {
    isDeleteMode: true
}