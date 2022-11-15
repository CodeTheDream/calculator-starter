import "../styles/globals.css";
import { ThemeProvider, createTheme} from "@mui/material/styles";
import { initialize, mswDecorator } from 'msw-storybook-addon';

// Initialize MSW
initialize();

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const withThemeProvider = (Story, context) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Story {...context} />
    </ThemeProvider>
  );
};

// Provide the MSW addon decorator globally
export const decorators = [withThemeProvider, mswDecorator];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}