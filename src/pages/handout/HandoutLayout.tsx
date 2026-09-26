import {useState, type Dispatch, type SetStateAction} from "react";
import {Outlet} from "react-router";
import type {Handout} from "../../types/handout.ts";

export type HandoutOutletContext = {
    handouts: Handout[];
    setHandouts: Dispatch<SetStateAction<Handout[]>>;
};

const HandoutLayout = () => {
    const [handouts, setHandouts] = useState<Handout[]>([]);

    return (
        <Outlet context={{handouts, setHandouts}}/>
    );
};

export default HandoutLayout;
