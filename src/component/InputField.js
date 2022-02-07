import React from 'react';
import styled from 'styled-components';
const StyledInput = styled.input`
    width: 100%;
    border-radius: 5px;
    border: 1px solid ${(prop) => prop.theme.btnColor};
    height: 30px;
    outline: none;
`;
class InputField extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <StyledInput
                autoFocus
                type="text"
                placeholder={this.props.placeholder}
                defaultValue={this.props.value}
                onKeyPress={(e) => {
                    if (e.target.value !== '' && e.key === 'Enter') {
                        this.inputSubmit(e.target.value);
                        e.target.value = '';
                    }
                }}
            />
        );
    }
    inputSubmit(title) {
        const { toggleEditMode, onSubmitTodo, updateItem, inputType } = this.props;
        if (inputType && inputType === 'create') {
            //create
            onSubmitTodo(title);
        } else {
            //update
            updateItem(title);
            toggleEditMode();
        }
    }
}

export default InputField;
