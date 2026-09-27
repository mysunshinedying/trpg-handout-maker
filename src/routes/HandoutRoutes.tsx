import type {RouteObject} from 'react-router';
import HandoutLayout from "../pages/handout/HandoutLayout.tsx";
import HandoutList from "../pages/handout/HandoutList.tsx";
import HandoutComplete from "../pages/handout/HandoutComplete.tsx";

export const HandoutRoutes: RouteObject = {
    path: 'handout',
    element: <HandoutLayout/>,
    children: [
        {index: true, element: <HandoutList/>},
        {path: 'complete', element: <HandoutComplete/>}
    ],
};
