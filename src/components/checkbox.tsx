import styled, { css } from 'styled-components'
import { CheckMark, CheckMarkRound } from '../assets/icons';
import { device } from '../theme';


const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 0px;
  margin: 0px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 0px;
`
const StyledCheckbox = styled.div<{ $checked: boolean; $variant: "round" | "4" }>`
display: flex;
justify-content: center;
align-items: center;
width: 21px;
height: 21px;
background: transparent;
border: 1px solid #4E148C;
border-radius: 4px;
transition: all 150ms;
&& svg {
  stroke: none;
  fill: #4E148C;
}
  @media(${device.tablet}){
    border: 1px solid #ffffff;
    && svg {
      stroke: #ffffff;
      fill: #ffffff;
    }
  }

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 1px rgba(78, 20, 140, .5);
  }

  ${props =>
    props.$variant === "round" &&
    css`
      border-radius: 50px;
    `};
`
const CheckboxContainer = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;
width: 21px;
height: 21px;
`

type CheckboxProps = {
  variant: "round" | "4";
  checked: boolean;
  value: string;
  name: string;
  id: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ variant, checked, ...props }) => (
  <CheckboxContainer>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox $checked={checked} $variant={variant}>
      {variant === "4" && checked && CheckMark("svg")}
      {variant === "round" && checked && CheckMarkRound("svg")}
    </StyledCheckbox>
  </CheckboxContainer>

)


export default Checkbox