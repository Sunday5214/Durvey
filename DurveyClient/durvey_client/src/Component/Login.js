import React from 'react';
import {usePageDispatch} from '../Contexts/PageContext';
import styled from 'styled-components';
import SurveySubmit from './SurveySubmit';

const StyledLoginLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 700px;
    justify-content: center;
    align-items: center;
`;

const StyledWelcome = styled.div`
    font-size: 40px;
    width: 30%;
    font-family: '나눔바른고딕';
    border-bottom: 1px solid #0088FF;
    border-top: none;
    border-left: none;
    border-right: none;
    text-align: center;
`;

const StyledEmailBox = styled.textarea`
    resize: none;
    height: 30px;
    width: 20%;
    font-size: 20px;
    font-family: 'Segoe UI';
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #0088FF;
    margin-top: 200px;
    margin-bottom: 200px;
    &:hover{
        border-bottom-width: 2px;
    }
`;

const Login = () =>{
    const dispatch = usePageDispatch();
    const onComplete = () => {
        alert('로그인 완료!');
        dispatch({type: 'CHANGE', link: '/home'});
    }
    return(
        <StyledLoginLayout>
            <StyledWelcome>환영합니다!</StyledWelcome>
            <StyledEmailBox defaultValue='' placeholder='이메일을 입력해주세요!'></StyledEmailBox>
            <SurveySubmit widthValue='30%' clickEvent={onComplete}>로그인!</SurveySubmit>
        </StyledLoginLayout>
        
    )
}

export default Login;