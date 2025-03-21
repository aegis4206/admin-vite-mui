import { MenuItem } from "../types/menu";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import {
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    ListItemIcon,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const MenuItemComponent: React.FC<{
    item: MenuItem;
    level: number;
}> = ({ item, level }) => {
    const [open, setOpen] = useState<boolean>(false);
    const hasChildren = "children" in item && !!item.children && item.children.length > 0;
    const location = useLocation();

    const includeCheck = (item: MenuItem): boolean =>
        "children" in item && !!item.children && item.children.some(childremItem => {
            if ("children" in childremItem && !!childremItem.children && childremItem.children.length > 0) {
                return includeCheck(childremItem)
            }
            return location.pathname === `/${childremItem.path}`
        });

    const isInclude = includeCheck(item);
    const isActive = item.path && location.pathname === `/${item.path}`;

    // 根據是否有子項決定是否渲染為 Menu.Item
    // const Component = hasChildren ? ListItemButton : (Menu.Item as React.ElementType);

    return (
        <>
            <ListItemButton
                sx={{
                    pl: level == 0 ? null : level * 3,
                    maxWidth: "100%",
                    "& .MuiListItemText-root": {
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis", // 超出顯示省略號
                    },
                }}
                onClick={hasChildren ? () => setOpen(!open) : undefined}
                component={(Link as React.ElementType)} // 無子項時作為Link
                to={hasChildren ? undefined : `/${item.path}`} // 有子項時不設Link
                selected={!!isActive || isInclude}
            >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText sx={{ ml: -2, overflow: "hidden" }} primary={item.name} />
                {hasChildren && (open ? <MdExpandLess /> : <MdExpandMore />)}
            </ListItemButton >

            {hasChildren && item.children && (
                <Collapse in={open} >
                    <List component="div" disablePadding>
                        {item.children.map((child: MenuItem, index: number) => (
                            <MenuItemComponent key={index} item={child} level={level + 1} />
                        ))}
                    </List>
                </Collapse>
            )
            }
        </>
    );
};

export default MenuItemComponent;