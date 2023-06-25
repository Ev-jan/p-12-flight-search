import { createGlobalStyle } from "styled-components";

enum screenSize {
  mobileS = "320px",
  mobileM = "375px",
  mobileL = "425px",
  tablet = "768px",
  laptop = "1049px",
  laptopL = "1440px",
  desktop = "2560px",
}

export enum device {
  mobileS = `(max-width: ${screenSize.mobileS})`,
  mobileM = `(max-width: ${screenSize.mobileM})`,
  mobileL = `(max-width: ${screenSize.mobileL})`,
  tablet = `(max-width: ${screenSize.tablet})`,
  laptop = `(max-width: ${screenSize.laptop})`,
  laptopL = `(max-width: ${screenSize.laptopL})`,
  desktop = `(max-width: ${screenSize.desktop})`,
  desktopL = `(max-width: ${screenSize.desktop})`,
}

enum fontSize {
  s16 = "16px",
  s20 = "20px",
  s24 = "24px",
  s32 = "32px",
}

enum colors {
  purple = "#4E148C",
  lavenderLight = "#E8EBF2",
  lavender = "#858AE3",
  white = "#F7F9F7",
}

enum fontWeight {
  w400 = "400",
  w500 = "500",
  w600 = "600",
  w700 = "700",
}

export const theme = {
  typography: {
    fontFamily: "Inter",
    fontSize: fontSize,
    fontWeight: fontWeight,
  },
  color: colors,
};

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${(props) => props.theme.typography.fontFamily};

  }
  * {    
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
`;
