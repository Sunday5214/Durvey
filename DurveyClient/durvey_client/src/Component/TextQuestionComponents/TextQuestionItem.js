import React, {useState} from 'react';
import TextareaAutosize from 'react-autosize-textarea/lib';
import { useMakeSurveyDispatch } from '../../Contexts/MakeSurveyContext';
import { QuestionItemLayout, QuestionContent } from '../QuestionComponents/QuestionItemLayout';
import './TextQuestionItem.scss';


const TextQuestionItem = ({addAnswer, content, questionIdx, isDeleteMode}) => {
    const [textState, setText] = useState('');
    const questionsDisatch = useMakeSurveyDispatch();
    const onCompleteAnswer = e => {
        addAnswer({questionIdx:questionIdx, questionType:2, answer:e.target.value})
        setText(e.target.value);
    }
    const onDeletThis = () => questionsDisatch({type:'DELETE_QUESTION', idx:questionIdx});
    return(
        <QuestionItemLayout>
            <QuestionContent clickEvent={onDeletThis} isDeleteMode={isDeleteMode}>
                {content}
            </QuestionContent>
            <TextareaAutosize defaultValue={textState} onBlur={onCompleteAnswer} className='InputBox'  placeholder='응답을 입력해주세요'/>
        </QuestionItemLayout>
    )
}

export default TextQuestionItem; 