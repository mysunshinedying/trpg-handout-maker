import {Navigate, type RouteObject, useRoutes} from "react-router";
import GlobalLayout from "../layout/GlobalLayout.tsx";
import {HandoutRoutes} from "./HandoutRoutes.tsx";

export default function RootRoutes() {
    const routes: RouteObject[] = [
        {
            element: <GlobalLayout/>,
            children: [
                HandoutRoutes,
                {path: '*', element: <Navigate to="/" replace/>},
            ],
        }
    ];

    return useRoutes(routes);
}