import React from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import styled from 'styled-components';
import BackgroundBlock from './BackgroundBlock';
import './OXQuestion.scss';

const StyledOXTitle = styled.div`
    font-size: 20px;
    width: 100%;
    height: 25%;
    font-family: 나눔스퀘어_ac;
    color: black;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 10px;
    margin-left: 20px;
`;


const OXQuestion = () => {
    return (
        <BackgroundBlock widthValue='90%' heightValue='auto'>
            <StyledOXTitle>OX 질문</StyledOXTitle>
            <TextareaAutosize className="InputBox" placeholder="질문 내용을 작성해주세요"></TextareaAutosize>
        </BackgroundBlock>
    )
}

export default OXQuestion;