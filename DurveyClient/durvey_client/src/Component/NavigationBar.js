import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { BiLogInCircle } from 'react-icons/bi';
import { usePageDispatch } from '../Contexts/PageContext';

const StyledNavigationBar = styled.div`
    height: 100%;
    width: 100%;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    opacity: 1;
    z-index: 5;
    display: flex;

`;



const StyledNavigationWrap = styled.div`
    display: flex;
    flex-direction: row;
    box-shadow: 0px 3px 6px #00000029;
    width: 100%;
`
const StyledNavigationLogin = styled.div`
    width: 300px;
    min-width: 300px;
    max-width: 300px;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`

const StyledNaviHeader = styled.header`
    width: 600px;
    min-width: 600px;
    max-width: 600px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const StyledNavigationListWrap = styled.nav`
    height: 100%;
    width: 100%;
    
`;
const StyledNavigation = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    list-style: none;
    
`;

const StyledNavigationItem = styled.li`
    height: 60px;
    width: 100px;
    font-family: 나눔바른고딕;
    cursor: pointer;
    color: black;
    display: flex;
    align-items: center;
    justify-content:center;
    
    &:hover{
        background: ${darken(0.1, 'white')};
    }

`;

const StyledSubtitle = styled.div`
    height: 100%;
    width: 40%;
    font-size: 12px;
    font-family: 나눔바른고딕;
    color: black;
    display: flex;
    align-items: center;
    justify-content:flex-start;
    margin-top: 10px;
    margin-left: 15px;
    opacity: 0.7;
`;

const StyledTitle = styled.div`
    cursor: pointer;
    height: 100%;
    width: 60%;
    font-size: 25px;
    font-family: Segoe UI;
    color: #0088FF;
    display: flex;
    align-items: center;
    justify-content:flex-end;
`;

const StyledLogin = styled.div`
    height: 100%;
    width: 60%;
    font-family: 나눔바른고딕;
    color: black;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 5px;
`;
const StyledLoginIcon = styled.div`
    height: 100%;
    width: 40%;
    font-size: 25px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledLoginButton = styled.button`
    height: 40px;
    width: 100px;
    display: flex;
    align-items: center;
    background: white;
    border-radius: 16px;
    border-style: solid;
    border-color: #0088FF;
    border-width: 1.5px;
    margin-right: 20px;
    cursor: pointer;
    &:hover{
        background: #0088FF;
        ${StyledLoginIcon}{
            color: white;
        }
        ${StyledLogin}{
            color: white;
        }
    }
`;

const NavigationItem = ({ link, children }) => {
    const dispatch = usePageDispatch();
    const onChange = () => dispatch({ type: 'CHANGE', link});

    return (
        <StyledNavigationItem onClick={onChange}>{children}</StyledNavigationItem>
    )
}

const Navigation = () => {
    const dispatch = usePageDispatch();
    const onChange = () => dispatch({ type: 'CHANGE', link: '/home'});
    return (
        <StyledNavigationBar>
            <StyledNavigationWrap>
                <StyledNaviHeader>
                    <StyledTitle onClick={onChange}>Durvey</StyledTitle>
                    <StyledSubtitle>180을 1로 만드는 서비스</StyledSubtitle>
                </StyledNaviHeader>
                <StyledNavigationListWrap>
                    <StyledNavigation>
                        <NavigationItem link='/answer/survey'>설문조사</NavigationItem>
                        <NavigationItem link='/result/survey'>설문결과</NavigationItem>
                        <NavigationItem link='/make/survey'>등록</NavigationItem>
                        <NavigationItem link='/make/survey'>실시간 투표</NavigationItem>
                    </StyledNavigation>
                </StyledNavigationListWrap>
                <StyledNavigationLogin>
                    <StyledLoginButton>
                        <StyledLoginIcon>
                            <BiLogInCircle />
                        </StyledLoginIcon>
                        <StyledLogin>로그인</StyledLogin>
                    </StyledLoginButton>
                </StyledNavigationLogin>
            </StyledNavigationWrap>
        </StyledNavigationBar>
    )
}

export default Navigation;