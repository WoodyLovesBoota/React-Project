import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";
import { Reset } from "styled-reset";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
      <Reset />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
