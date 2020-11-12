import React from 'react';
import styled from 'styled-components';
import { QuestionItemLayout, StyledQuestionContent } from './QuestionItemLayout';

const StyledOXPanel = styled.div`
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #0088FF;
    opacity: 1;
    font-size: 25;
    font-weight: bold;
    &:hover{
        border-width: 5px;
    }
`;
const StyledPanelLayout = styled.div`
    flex-direction: column;
    display: flex;
`;

const OXQuestionItem = ({ content }) => {
    return (
        <QuestionItemLayout>
            <StyledQuestionContent>
                {content}
            </StyledQuestionContent>
            <StyledPanelLayout>
                <StyledOXPanel>O</StyledOXPanel>
                <StyledOXPanel>X</StyledOXPanel>
            </StyledPanelLayout>
        </QuestionItemLayout>
    )
}

export default OXQuestionItem;