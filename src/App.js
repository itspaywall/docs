import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import { PrimaryLayout } from "./common";
import theme from "./theme";
import ScrollToTop from "./ScrollToTop";

// import SwaggerUI from "swagger-ui-react";
// import "swagger-ui-react/swagger-ui.css";

// function App() {
//     return <SwaggerUI url="/hubble.json" />;
// }

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <ScrollToTop />
                    <PrimaryLayout />
                </ThemeProvider>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
