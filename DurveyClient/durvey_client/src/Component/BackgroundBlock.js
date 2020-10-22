import React from 'react'
import styled from 'styled-components';

const StyledBackgroundBlock = styled.div`
    box-shadow: 0px 3px 6px #00000029;
    opacity: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    width: ${props => props.widthValue};
    height: ${props => props.heightValue};
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
`;

function BackgroundBlock({children, ...rest}) {
    return <StyledBackgroundBlock {...rest}>{children}</StyledBackgroundBlock>
}

export default BackgroundBlock;