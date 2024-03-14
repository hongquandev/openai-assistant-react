declare module "@mui/material/styles" {
  interface Theme {
    activedBgColor: string;
    borderColor: string;
  }
}

export const lightTheme = {
  palette: {
    mode: "light" as const,
    text: { primary: "#000000", secondary: "#666666", main: "#FFFFFF" },
    background: {
      default: "#FFFFFF",
    },
    borderColor: "rgba(0,0,0,.15)",
  },
  activedBgColor: "#000000",
  borderColor: "rgba(0,0,0,.15)",
};

export const darkTheme = {
  palette: {
    mode: "dark" as const,
    text: { primary: "#ececec", secondary: "#b4b4b4", main: "#000000" },
    background: {
      default: "#191919",
    },
  },
  activedBgColor: "#FFFFFF",
  borderColor: "hsla(0,0%,100%,.15)",
};
