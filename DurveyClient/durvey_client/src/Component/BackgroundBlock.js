import React from 'react'
import styled from 'styled-components';

const StyledBackgroundBlock = styled.div`
    box-shadow: 0 3px 5px 2px hsla(0,0%,80%,.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: ${props => props.widthValue};
    height: ${props => props.heightValue};
    margin: 30px 10px 10px 10px;
`;

function BackgroundBlock({children, ...rest}) {
    return <StyledBackgroundBlock {...rest}>{children}</StyledBackgroundBlock>
}

export default BackgroundBlock;