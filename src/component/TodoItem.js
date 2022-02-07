import React from 'react';
import InputField from './InputField';
import LevelTab from './LevelTab';
import { LevelConfig, LevelColor } from '../config/LevelConfig';
import styled, { keyframes, css } from 'styled-components';

const BtnArea = styled.div`
    position: absolute;
    top: 50%;
    right: 26px;
    transform: translateY(-50%);
`;

const showCheck = keyframes`
    0% { transform: rotate(-45deg) scale(0); }
    60% { transform: rotate(-45deg) scale(1.2); }
    100% { transform: rotate(-45deg) scale(1); }
`;
const hideCheck = keyframes`
    0% { transform: rotate(-45deg) scale(1); }
    100% { transform: rotate(-45deg) scale(0); }
`;
const fadeOut = keyframes`
    0% { opacity: 1; transform:translateY(0) rotate(0) scale(1)}
    100% { opacity: 0; transform:translateY(100vh)rotate(90deg) scale(0)}
`;
const fadeIn = keyframes`
    0% { opacity: 0; transform:translateY(100vh)}
    100% { opacity: 1; transform:translateY(0)}
`;
const CheckboxBtn = styled.span`
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 2px solid #c7c7c7;
    background-color: #fff;
    &:before {
        content: '';
        display: none;
        position: absolute;
        top: 0px;
        left: 0px;
        border: none;
        border-left: solid 3px ${(prop) => prop.theme.checkColor};
        border-bottom: solid 3px ${(prop) => prop.theme.checkColor};
        width: 22px;
        height: 10px;
        transform: rotate(-45deg) scale(0);
        transform-origin: bottom 5px left 2px;
    }
`;
const CustomizeCheckbox = styled.label`
    position: relative;
    cursor: pointer;
    padding-left: 36px;
    display: inline-block;
    vertical-align: middle;
    max-width: 70%;
    input {
        width: 0;
        opacity: 0;
        margin: 0;
        & ~ ${CheckboxBtn} {
            &:before {
                display: block;
                animation: ${hideCheck} 0.5s forwards;
            }
        }
        &:checked ~ ${CheckboxBtn} {
            border-color: ${(prop) => prop.theme.btnColor};
            &:before {
                display: block;
                animation: ${showCheck} 0.5s forwards;
            }
        }
    }
    &:hover ${CheckboxBtn} {
        border-color: ${(prop) => prop.theme.btnColor};
    }
`;

const BaseBtn = styled.button`
    border: none;
    background-color: ${(prop) => prop.theme.btnColor};
    border-radius: 5px;
    padding: 4px 10px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    height: 30px;
    & + & {
        margin-left: 10px;
    }
    &:hover {
        background-color: ${(prop) => prop.theme.checkColor};
    }
`;
const CloseBtn = styled(BaseBtn)`
    font-size: 0;
    width: 30px;
    position: relative;
    padding: 0;
    &:before,
    &:after {
        position: absolute;
        top: 5px;
        left: 15px;
        content: ' ';
        height: 20px;
        width: 2px;
        background-color: #fff;
    }
    &:before {
        transform: rotate(45deg);
    }
    &:after {
        transform: rotate(-45deg);
    }
`;
const List = styled.div`
    padding-top: 5px;
    border-radius: 20px;

    padding: 20px 20px;
    position: relative;
    font-size: 18px;
    & + & {
        margin-top: 22px;
    }
    background-color: #fff;
    border: 3px #fff solid;
    border-color: ${(prop) => prop.borderColor};
    animation: ${(props) =>
        props.isFirstRender &&
        css`
            ${fadeIn} .5s forwards
        `};

    animation: ${(props) =>
        props.isFadingOut &&
        css`
            ${fadeOut} 2s forwards
        `};
    ${LevelTab} {
        display: block;
    }
`;
const ListInputBox = styled.div`
    input {
        height: 15px;
        border-radius: 5px;
        border: 2px solid ${(prop) => prop.theme.checkColor};
        width: calc(100% - 200px);
        font-size: 18px;
        padding: 5px;
        display: inline-block;
        vertical-align: top;
    }
`;

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            isFadingOut: false,
            level: LevelConfig.LEVEL_1,
            isTabOpen: false,
        };
        this.isFirstRender = true;
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.setLevel = this.setLevel.bind(this);
        this.toggleLevelTab = this.toggleLevelTab.bind(this);
    }

    render() {
        return this.state.editable ? this.renderEditMode() : this.renderViewMode();
    }
    renderViewMode() {
        const { title, completed, onDelete, onToggle } = this.props;
        return (
            <List
                isFadingOut={this.state.isFadingOut}
                isFirstRender={this.isFirstRender}
                borderColor={this.getListBorderColor(this.state.level)}
            >
                <CustomizeCheckbox>
                    <input type="checkbox" checked={completed} onChange={() => onToggle && onToggle()} />
                    {title}
                    <CheckboxBtn></CheckboxBtn>
                </CustomizeCheckbox>
                <BtnArea>
                    <BaseBtn onClick={this.toggleEditMode}>Edit</BaseBtn>
                    <BaseBtn onClick={this.toggleLevelTab}>Level</BaseBtn>
                    <CloseBtn onClick={this.removeItem}></CloseBtn>
                    <LevelTab
                        setLevel={this.setLevel}
                        isTabOpen={this.state.isTabOpen}
                        toggleLevelTab={this.toggleLevelTab}
                    />
                </BtnArea>
            </List>
        );
    }
    renderEditMode() {
        const { onUpdate } = this.props;

        return (
            <List isFadingOut={this.state.isFadingOut}>
                <ListInputBox>
                    <InputField
                        placeholder="編輯待辦事項"
                        value={this.props.title}
                        toggleEditMode={this.toggleEditMode}
                        updateItem={(title) => {
                            onUpdate(title);
                        }}
                    />
                </ListInputBox>
            </List>
        );
    }
    toggleEditMode() {
        this.setState({ editable: !this.state.editable });
    }

    removeItem() {
        const { onDelete } = this.props;
        this.setState({ isFadingOut: true });

        setTimeout(() => {
            this.setState({ isFadingOut: false });
            onDelete();
        }, 500);
    }

    setLevel(level) {
        this.setState({ level: level });
    }
    toggleLevelTab() {
        this.setState({ isTabOpen: !this.state.isTabOpen });
    }
    componentDidMount() {
        this.isFirstRender = false;
        console.log('componentDidMount');
    }

    getListBorderColor(level) {
        console.log(LevelColor);
        console.log(level);

        let borderColor = 'tranaprent';
        switch (level) {
            case LevelConfig.LEVEL_2:
                borderColor = LevelColor.LEVEL_2;
                break;
            case LevelConfig.LEVEL_3:
                borderColor = LevelColor.LEVEL_3;
                break;
            default:
                break;
        }
        console.log(borderColor);
        return borderColor;
    }
}
export default TodoItem;
