import React from 'react';
import styled from 'styled-components';
import BackgroundBlock from './BackgroundBlock';
import TextareaAutosize from "react-autosize-textarea"
import './SelectQuestion.scss';
import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';

const StyledSelectTitle = styled.div`
    font-size: 20px;
    width: 100%;
    font-family: 나눔스퀘어_ac;
    color: black;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 10px;
    margin-left: 20px;
`;

const StyledOptionAddBtn = styled.div`
    width: 40%;
    margin-bottom: 5px;
    font-size: 30px;
    color: rgb(0, 136, 255);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const OptionInputDeleteBtn = styled.div`
    width: 5%;
    font-size: 30px;
    margin-left: 5px;
    display: flex;
    align-items: center;
    color: rgb(255, 0, 30);
`;

const OptionLayout = styled.div`
    width: 96%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    margin-bottom: 5px;
`;

const OptionInputAdd = () => {
    return (
        <OptionLayout>
            <TextareaAutosize className='OptionInput' placeholder="보기를 작성해주세요"></TextareaAutosize>
            <OptionInputDeleteBtn>
                <MdRemoveCircleOutline />
            </OptionInputDeleteBtn>
        </OptionLayout>
    )
}

const SelectQuestion = () => {
    return (
        <BackgroundBlock widthValue='90%' heightValue='auto'>
            <StyledSelectTitle>객관식 질문</StyledSelectTitle>
            <TextareaAutosize className='SelectContentInput' placeholder="질문 내용을 입력해주세요"></TextareaAutosize>
            <OptionInputAdd />
            <OptionInputAdd />
            <OptionInputAdd />
            <StyledOptionAddBtn>
                <MdAddCircleOutline />
            </StyledOptionAddBtn>
        </BackgroundBlock>
    )
}

export default SelectQuestion;