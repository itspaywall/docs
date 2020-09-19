import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

function App() {
    return <SwaggerUI url="/hubble.json" />;
}

export default App;
