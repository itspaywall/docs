import React from "react";

const configuration = [
    {
        path: "/api",
        component: React.lazy(() => import("./api/APIReference")),
    },
];

export default configuration;
