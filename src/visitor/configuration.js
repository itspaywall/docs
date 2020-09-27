import React from "react";

const configuration = [
    {
        path: "/api",
        component: React.lazy(() => import("./api/APIReference")),
    },
    {
        path: "/guides",
        component: React.lazy(() => import("./guides/Guides")),
    },
];

export default configuration;
