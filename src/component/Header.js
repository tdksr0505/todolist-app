import styled from 'styled-components';
import { useState, useEffect } from 'react';

const StyledHeader = styled.div`
    text-align: center;
    font-size: 40px;
    margin-bottom: 30px;
    padding-bottom: 8px;
    color: ${(prop) => prop.theme.listBgColor};
    .note {
        font-size: 20px;
        color: red;
        margin-top: 10px;
    }
`;

function Header(prop) {
    const [isFinish, setIsFinish] = useState(false);
    useEffect(() => {
        console.log('render once');
    }, []);
    useEffect(() => {
        console.log('every time render');
        checkIsAllFinish(prop, setIsFinish);
    });
    useEffect(() => {
        setWebTitle(isFinish);
    }, [isFinish]);
    return (
        <StyledHeader>
            {prop.appName}
            <br />
            <div className="note">您還有{prop.todosCnt}件事項未完成</div>
        </StyledHeader>
    );
}

const setWebTitle = (isFinish) => {
    console.log(document.title);

    if (isFinish) {
        setTimeout(() => {
            alert('所有代辦事項已完成!!');
        }, 300);
        document.title = 'All Finish | React App';
    } else {
        document.title = 'Not Finish | React App';
    }
};

const checkIsAllFinish = (prop, setIsFinish) => {
    if (prop.todosCnt === 0) {
        setIsFinish(true);
    } else {
        setIsFinish(false);
    }
};
export default Header;
