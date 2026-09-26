import type {RouteObject} from 'react-router';
import HandoutList from "../pages/handout/HandoutList.tsx";

export const HandoutRoutes: RouteObject = {
    path:'handout',
    children:[
        { index: true, element: <HandoutList/> }
    ]
};
