import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { Provider } from "react-redux";
import theme from "./theme";
import store from "./redux";

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <Provider store={store}>
                <CSSReset />

                <App />
            </Provider>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
