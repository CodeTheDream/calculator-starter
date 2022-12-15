// import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
// importing props. This is standard and not dependent on function component name
import type {AppProps} from "next/app"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
}); 

// annotating the props with interface


function MyApp({ Component, pageProps }:AppProps):JSX.Element {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

