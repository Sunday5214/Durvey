import React from 'react';
import styled from 'styled-components';
import { RiDragMoveLine } from 'react-icons/ri';

const StyledTitle = styled.div`
    font-size: 20px;
    font-family: 나눔스퀘어_ac;
    width: 30%;
    margin-left: 10px;
    margin-top: 10px;
    justify-content: flex-start;
`;

const TitleLayout = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    color: black;
`;

const DragNDropIcon = styled.div`
    width: 70%;
    font-size: 20px;
    color: #0088FF;
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
    margin-top: 10px;
    opacity: 1;
    cursor: pointer;
    &:hover{
        font-size: 25px;
    }
`;

const QuestionTitle = ({children}) => {
    return (
        <TitleLayout>
            <StyledTitle>{children}</StyledTitle>
            <DragNDropIcon>
                <RiDragMoveLine />
            </DragNDropIcon>
        </TitleLayout>

    )
}

export default QuestionTitle;