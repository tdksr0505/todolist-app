import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import LevelConfig from '../config/LevelConfig';

const circle = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    & + & {
        margin-left: 10px;
    }
`;
const RedIcon = styled(circle)`
    background-color: red;
`;
const OrangeIcon = styled(circle)`
    background-color: orange;
`;
const GreenIcon = styled(circle)`
    background-color: green;
`;
const Tab = styled.div`
    width: 80px;
    position: absolute;
    top: -40px;
    right: 20px;
    background-color: #fff;
    border-radius: 30px;
    padding: 5px 10px;
    border: 2px solid #0072ff;
    display: none;

    ${({ active }) =>
        active &&
        `
        display: block;
        `}
    &:before {
        content: '';
        display: block;
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 6px 6px 0 6px;
        border-color: #0072ff transparent transparent transparent;
    }
`;
const LevelTab = (prop) => {
    const { setLevel, toggleLevelTab, isTabOpen } = prop;
    return (
        <Tab active={isTabOpen}>
            <RedIcon
                onClick={() => {
                    setLevel(LevelConfig.LEVEL_3);
                    toggleLevelTab();
                }}
            />
            <OrangeIcon
                onClick={() => {
                    setLevel(LevelConfig.LEVEL_2);
                    toggleLevelTab();
                }}
            />
            <GreenIcon
                onClick={() => {
                    setLevel(LevelConfig.LEVEL_1);
                    toggleLevelTab();
                }}
            />
        </Tab>
    );
};

export default LevelTab;
