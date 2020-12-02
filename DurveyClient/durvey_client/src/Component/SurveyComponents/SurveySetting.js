import React from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import '../../Component/CustomCalendar/Calendar.css';
import TimeInput from '../QuestionComponents/TimeInput';
import moment from 'moment';
import { useMakeSurveyDispatch, useMakeSurveyState} from '../../Contexts/MakeSurveyContext';

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
    const datetimeDisptach = useMakeSurveyDispatch();
    const datetimeState = useMakeSurveyState();
    const defaultStartDate = new Date(moment(datetimeState.startDatetime).format('YYYY-MM-DD'));
    const defaultEndDate = new Date(moment(datetimeState.endDatetime).format('YYYY-MM-DD'));
    const defaultStartTime =  moment(datetimeState.startDatetime).format('HH:mm');
    const defaultEndTime = moment(datetimeState.endDatetime).format('HH:mm');
    const onChangeStartDate = startDate => {
        datetimeDisptach({type:'CHANGE_START_DATETIME', 
        startDatetime: moment(startDate).format('YYYY-MM-DD')+'T'+defaultStartTime});
    }
    const onChangeEndDate = endDate => {
        datetimeDisptach({type:'CHANGE_END_DATETIME',
        endDatetime: moment(endDate).format('YYYY-MM-DD')+'T'+defaultEndTime});
    }
    const onChangeStartTime = time =>{
        datetimeDisptach({type:'CHANGE_START_DATETIME',
        startDatetime: moment(defaultStartDate).format('YYYY-MM-DD')+'T'+time});
    }
    const onChangeEndTime = time =>{
        datetimeDisptach({type:'CHANGE_END_DATETIME',
        endDatetime: moment(defaultEndDate).format('YYYY-MM-DD')+'T'+time});
    }
    return (
        <SettingLayout>
            <SettingHeader>설문 시작 날짜</SettingHeader>
            <Calendar onChange={onChangeStartDate} value={defaultStartDate}/>
            <TimeInput onTimeChanged={onChangeStartTime} value={defaultStartTime}/>
            <SplitLine/>
            <SettingHeader>설문 종료 날짜</SettingHeader>
            <Calendar onChange={onChangeEndDate} value={defaultEndDate}/>
            <TimeInput onTimeChanged={onChangeEndTime} value={defaultEndTime}/>
        </SettingLayout>
    )
}

export default SurveySetting;