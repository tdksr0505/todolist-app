import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import { LevelConfig, LevelColor } from '../config/LevelConfig';

const CircleIcon = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    background-color: ${(prop) => prop.bgColor};

    & + & {
        margin-left: 10px;
    }
`;

const Tab = styled.div`
    width: 80px;
    position: absolute;
    top: -40px;
    right: 20px;
    background-color: #fff;
    border-radius: 30px;
    padding: 5px 10px;
    border: 2px solid ${(prop) => prop.theme.checkColor};
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
        border-color: ${(prop) => prop.theme.checkColor} transparent transparent transparent;
    }
`;
const LevelTab = (prop) => {
    const { setLevel, toggleLevelTab, isTabOpen } = prop;
    return (
        <Tab active={isTabOpen}>
            <CircleIcon
                bgColor={LevelColor.LEVEL_3}
                onClick={() => {
                    setLevel(LevelConfig.LEVEL_3);
                    toggleLevelTab();
                }}
            />
            <CircleIcon
                bgColor={LevelColor.LEVEL_2}
                onClick={() => {
                    setLevel(LevelConfig.LEVEL_2);
                    toggleLevelTab();
                }}
            />
            <CircleIcon
                bgColor={LevelColor.LEVEL_1}
                onClick={() => {
                    setLevel(LevelConfig.LEVEL_1);
                    toggleLevelTab();
                }}
            />
        </Tab>
    );
};

export default LevelTab;
