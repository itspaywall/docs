/*
 * Copyright 2017-2020 Samuel Rowe, Joel E. Rego
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
