import React from 'react';
import styled from 'styled-components';
import BackgroundBlock from './BackgroundBlock';
import TextareaAutosize from "react-autosize-textarea"
import './SelectQuestion.scss';
import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import QuestionTitle from './QuestionTitle';
import { useSelectQuestionDispatch, useSelectQuestionState, useSelectQuestionNextId } from '../Contexts/SelectQuestionContext';
import { useMakeSurveyNextId, useMakeSurveyDispatch } from '../Contexts/MakeSurveyContext';

const StyledOptionAddBtn = styled.div`
    width: 40%;
    margin-bottom: 5px;
    font-size: 30px;
    color: rgb(0, 136, 255);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
        font-size:35px;
    }
`;

const OptionInputDeleteBtn = styled.div`
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

const OptionLayout = styled.div`
    width: 96%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    margin-bottom: 5px;
`;

const OptionInput = ({optionContent, optionIdx}) => {
    const selectDispatch = useSelectQuestionDispatch();
    const onDeleteOption = () => selectDispatch({ type: 'DELETE_OPTIONS', idx: optionIdx })
    const onChangeOptionContent = e => selectDispatch({ type: 'CHANGE_OPTIONS', idx: optionIdx, content: e.target.value })
    return (
        <OptionLayout>
            <TextareaAutosize onBlur={onChangeOptionContent} className='OptionInput'  placeholder="보기를 작성해주세요">{optionContent}</TextareaAutosize>
            <OptionInputDeleteBtn onClick={onDeleteOption}>
                <MdRemoveCircleOutline />
            </OptionInputDeleteBtn>
        </OptionLayout>
    )
}

const SelectQuestion = () => {
    const selectDispatch = useSelectQuestionDispatch();
    const selectState = useSelectQuestionState();
    const optionNextId = useSelectQuestionNextId();
    const questionNextId = useMakeSurveyNextId();
    const questionDispatch = useMakeSurveyDispatch();
    const onAddOption = () => {
        selectDispatch({ type: 'CREATE_OPTIONS', content: '', idx: optionNextId.current });
        optionNextId.current += 1;
    }
    const onChangeContent = e => selectDispatch({ type: 'CHANGE_CONTENT', content: e.target.value });
    const onAddQuestion = () => {
        questionDispatch({type: 'CREATE_SELECT_QUESTION', idx: questionNextId.current, 
        content: selectState.content, options: selectState.options});
        questionNextId.current+=1;
    }
    return (
        <BackgroundBlock widthValue='90%' heightValue='auto'>
            <QuestionTitle clickEvent={onAddQuestion}>객관식 질문</QuestionTitle>
            <TextareaAutosize onBlur={onChangeContent} className='SelectContentInput' placeholder="질문 내용을 입력해주세요"></TextareaAutosize>
            {selectState.options.map(
                (option) =>
                {
                   return <OptionInput optionContent={option.content} optionIdx={option.idx} key={option.idx} />
                }
            )}
            <StyledOptionAddBtn onClick={onAddOption}>
                <MdAddCircleOutline />
            </StyledOptionAddBtn>
        </BackgroundBlock>
    )
}

export default SelectQuestion;