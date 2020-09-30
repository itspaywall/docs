import React from "react";

const configuration = [
    {
        path: "/api",
        component: React.lazy(() => import("./api/APIReference")),
    },
    {
        path: "/guides/:guide/:section",
        component: React.lazy(() => import("./guides/Guides")),
    },
    {
        path: "/guides/:guide",
        component: React.lazy(() => import("./guides/Guides")),
    },
];

export default configuration;
