import React from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import '../Component/CustomCalendar/Calendar.css';
import TimeInput from './TimeInput';

const SettingLayout = styled.div`
    margin: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SettingHeader = styled.div`
    font-size: 15px;
    font-family: '나눔고딕';
`;

const SplitLine = styled.div`
    border: none;
    background: #0088FF;
    height: 1px;
    width: 110%;
    margin-top: 15px;
    margin-bottom: 15px;
`;

const SurveySetting = () => {
    return (
        <SettingLayout>
            <SettingHeader>설문 시작 날짜</SettingHeader>
            <Calendar/>
            <TimeInput/>
            <SplitLine/>
            <SettingHeader>설문 종료 날짜</SettingHeader>
            <Calendar/>
            <TimeInput/>
        </SettingLayout>
    )
}

export default SurveySetting;