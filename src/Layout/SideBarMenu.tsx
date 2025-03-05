import {
    List,
} from "@mui/material";
import React from "react";
import MenuItemComponent from "./MenuItem";
import { useAtom } from "jotai";
import { sideBarMenuData } from "../states/list";
import { MenuItem } from "../types/menu";


const SideBarMenu = () => {
    const [list,] = useAtom<MenuItem[]>(sideBarMenuData)

    return (
        <>
            <List component="div" >
                {list.map((item: MenuItem, index: number) => (
                    <MenuItemComponent key={index} item={item} level={0} />
                ))}
            </List>
        </>
    );
};



export default SideBarMenu;