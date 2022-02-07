import themeConfig from '../config/themeConfig';
import styled from 'styled-components';

const ColorIcon = styled.div`
    display: inline-block;
    vertical-align: middle;
    width: 30px;
    height: 30px;
    cursor: pointer;
    border-radius: 5px;
    background-color: ${(prop) => prop.bgColor};
    & + & {
        margin-left: 15px;
    }
`;

const ThemeArea = (prop) => {
    return (
        <div>
            <ColorIcon
                bgColor={themeConfig.blueTheme.btnColor}
                onClick={() => {
                    prop.onChangeTheme(themeConfig.blueTheme);
                }}
            />
            <ColorIcon
                bgColor={themeConfig.orangeTheme.btnColor}
                onClick={() => {
                    prop.onChangeTheme(themeConfig.orangeTheme);
                }}
            />
            <ColorIcon
                bgColor={themeConfig.purpleTheme.btnColor}
                onClick={() => {
                    prop.onChangeTheme(themeConfig.purpleTheme);
                }}
            />
        </div>
    );
};

export default ThemeArea;
