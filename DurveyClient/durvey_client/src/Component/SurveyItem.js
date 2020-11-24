import React from 'react';
import styled from 'styled-components';
import {FiChevronDown} from 'react-icons/fi';

const StyledSurveyItemBox = styled.div`
    height: 290px;
    width: 230px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #00000029;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 30px;
    &:hover{
        border-color: #0088FF;
    }
`;

const StyledDownIcon = styled.div`
    color: #0088FF;
    font-size: 12px;
`;


const StyledSurveyItemTitle = styled.div`
    height: 80%;
    font-size: 20px;
    font-weight: bold;
    font-family: '나눔고딕';
    color: black;
`;

const StyledSurveyItemBottomBox = styled.div`
    height: 20%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const StyledEffectiveDate = styled.div`
    font-size: 12px;
    font-family: '나눔고딕';
    color: black;
    opacity: 0.8;
`;

const SurveyItem = ({title, startDatetime, endDateTime}) => {
    console.log(title, startDatetime ,endDateTime);
    return(
        <StyledSurveyItemBox>
            <StyledSurveyItemTitle>{title}</StyledSurveyItemTitle>
            <StyledSurveyItemBottomBox>
                <StyledEffectiveDate>
                    기간: {startDatetime} ~ {endDateTime}
                </StyledEffectiveDate>
                <StyledDownIcon>
                    <FiChevronDown/>
                </StyledDownIcon>
            </StyledSurveyItemBottomBox>
        </StyledSurveyItemBox>
    )
}

export default SurveyItem;