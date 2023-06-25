import styled, { css } from 'styled-components'

const StyledButton = styled.button<{ $shape?: "roundLeft" | "roundRight" | "4" | "all-round-10"; $disabled?: boolean; $inactive: boolean}>`
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: center;
background: ${(props) => props.theme.color.purple};
border: 1px solid #4E148C;
font-size: ${(props) => props.theme.typography.fontSize.s16};
color: #F7F9F7;
font-weight: ${(props) => props.theme.typography.fontWeight.w700};
margin: 0;
width: 100%;
height: 55px;
cursor: pointer;

&:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

${props =>
    props.$inactive &&
    css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.theme.color.lavenderLight};
    border: 1px solid #4E148C;
    color: ${(props) => props.theme.color.purple};
    font-size: ${(props) => props.theme.typography.fontSize.s16};
    color: ${(props) => props.theme.color.purple};
    font-weight: ${(props) => props.theme.typography.fontWeight.w700};
    `};
${props =>
    props.$shape=== "roundLeft" &&
    css`
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    `};

${props =>
    props.$shape === "roundRight" &&
    css`
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    `};
${props =>
    props.$shape === "4" &&
    css`
    border-radius: 0;
    `};
${props =>
    props.$shape === "all-round-10" &&
    css`
    border-radius: 10px;
    `};
`
type ButtonProps = {
    text: string
    handleClick: ()=> void;
    shape: "roundLeft" | "roundRight" | "4" | "all-round-10";
    disabled: boolean;
    active: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
    const {text, handleClick, shape, disabled, active} = props
    return <StyledButton
    $shape={shape}
    onClick={handleClick}
    $disabled={disabled}  
    disabled={disabled}
    $inactive={active}>{disabled ? "Загрузка..." : text}</StyledButton>

}

export default Button