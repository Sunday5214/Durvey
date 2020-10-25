import React from 'react';
import styled from 'styled-components';
import BackgroundBlock from './BackgroundBlock';
import TextareaAutosize from "react-autosize-textarea"
import './SelectQuestion.scss';
import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import QuestionTitle from './QuestionTitle';
import { useSelectQuestionDispatch, useSelectQuestionState, useSelectQuestionNextId } from '../Contexts/SelectQuestionContext';

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
    font-size: 20px;
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

const OptionInput = (optionValue, optionId) => {
    const selectDispatch = useSelectQuestionDispatch();
    const selectState = useSelectQuestionState();
    const onDeleteOption = () => selectDispatch({ type: 'DELETE_OPTIONS', id: optionId })
    const onChangeOptionContent = e => selectDispatch({ type: 'CHANGE_OPTIONS', id: optionId, optionContent: e.target.value })
    console.log(selectState);
    return (
        <OptionLayout>
            <TextareaAutosize onBlur={onChangeOptionContent} className='OptionInput' value={optionValue} placeholder="보기를 작성해주세요"></TextareaAutosize>
            <OptionInputDeleteBtn onClick={onDeleteOption}>
                <MdRemoveCircleOutline />
            </OptionInputDeleteBtn>
        </OptionLayout>
    )
}

const SelectQuestion = () => {
    const selectDispatch = useSelectQuestionDispatch();
    const selectState = useSelectQuestionState();
    const nextId = useSelectQuestionNextId();
    const onAddOption = () => {
        selectDispatch({ type: 'CREATE_OPTIONS', option: '', id: nextId.current });
        nextId.current += 1;
    }
    const onChangeContent = e => selectDispatch({ type: 'CHANGE_CONTENT', content: e.target.value });
    console.log(selectState);
    return (
        <BackgroundBlock widthValue='90%' heightValue='auto'>
            <QuestionTitle>객관식 질문</QuestionTitle>
            <TextareaAutosize onBlur={onChangeContent} className='SelectContentInput' placeholder="질문 내용을 입력해주세요"></TextareaAutosize>
            {selectState.options.map(option =>
                <OptionInput optionValue={option.content} optionId={option.id} />
// TODO:오류나는 원인 찾기
            )};
            <StyledOptionAddBtn onClick={onAddOption}>
                <MdAddCircleOutline />
            </StyledOptionAddBtn>
        </BackgroundBlock>
    )
}

export default SelectQuestion;