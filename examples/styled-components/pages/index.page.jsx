/// @ts-check
import styled from "styled-components";
import { CSSVariable, serializeThemeValues } from "css-variable";

const theme = {
  fontSize: new CSSVariable("FontSize"),
  spacings: {
    s: new CSSVariable(),
    m: new CSSVariable(),
    l: new CSSVariable(),
  },
  colors: {
    primary: new CSSVariable("primary"),
    secondary: new CSSVariable("secondary"),
  },
};

const ThemeA = styled.div`
  ${serializeThemeValues(theme, {
    fontSize: "12px",
    spacings: {
      s: "10px",
      m: "20px",
      l: "30px",
    },
    colors: {
      primary: "#6290C3",
      secondary: "#C2E7DA",
    },
  })}
`;

const ThemeB = styled.div`
  ${serializeThemeValues(theme, {
    fontSize: "24px",
    spacings: {
      s: "20px",
      m: "40px",
      l: "60px",
    },
    colors: {
      primary: "#7C9EB2",
      secondary: "#52528C",
    },
  })}
`;

const colorVar = new CSSVariable({ value: theme.colors.primary });
const xVar = new CSSVariable({ value: 0, unit: "px" });

const StyledHeadline = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  font-size: ${theme.fontSize};
  color: ${colorVar};
  transform: translateX(${xVar});
  width: calc(100% - 1 * ${xVar});
`;

/** @param {{color?:string, children: string}} props */
const FancyComponent = ({ color, children }) => {
  return (
    <StyledHeadline style={color && colorVar.createStyle(color)}>
      {children}
    </StyledHeadline>
  );
};

const BigBox = styled.div`
  background: ${theme.colors.secondary};
  padding: ${theme.spacings.m};

  ${colorVar.createStyle("grey")}
  ${xVar.createStyle(20)}

  @media (min-width: 500px) {
    ${xVar.createStyle(250)};
  }
`;

const Demo = () => (
  <>
    <FancyComponent color="orange">Demo</FancyComponent>
    <div style={xVar.createStyle(200)}>
      <FancyComponent>xOffset</FancyComponent>
    </div>
    <BigBox>
      <FancyComponent>Inside Box</FancyComponent>
    </BigBox>
  </>
);

const Index = () => (
  <>
    <ThemeA>
      <Demo />
    </ThemeA>
    <br />
    <br />
    <ThemeB>
      <Demo />
    </ThemeB>
  </>
);

export default Index;
