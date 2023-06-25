import styled from "styled-components";
import logo from "./../../public/logo.png"
import { device } from "../theme";

const LogoImage = styled.img`
  width: 100px;
  height: 85px;
  margin-right: 34px;

  @media(${device.tablet}) {
    width: 57px;
    height: 46px;
    margin-right: 0;
  }
`;

const StyledHeader = styled.header`
display: flex;
align-items: center;
justify-content: flex-start;
padding: 19px 36px;
margin-bottom: 8px;

@media(${device.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
const LogoText = styled.div`
font-size: ${(props) => props.theme.typography.fontSize.s24};
color: ${(props) => props.theme.color.purple};
font-weight: ${(props) => props.theme.typography.fontWeight.w700};

@media(${device.tablet}) {
    display: none;
  }
`


const Header: React.FC = () => {
    return (
        <StyledHeader>
            <LogoImage src={logo} alt={"Airplane logo"} />
            <LogoText>Поиск авиабилетов</LogoText>
        </StyledHeader>
    )
}

export default Header