import { useLocation, Link } from "react-router-dom";
import { Box, Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import { sideBarMenuData } from "../states/list";
import { MenuItem } from "../types/menu";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";

const Breadcrumbs = () => {
    const [pathList, setpathList] = useState<MenuItem[]>([]);
    const [list,] = useAtom<MenuItem[]>(sideBarMenuData)
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(x => x);

    const findParentPath = (menuItemArr: MenuItem[], target: string, path: MenuItem[] = []): MenuItem[] => {
        for (const item of menuItemArr) {
            const currentPath = [...path, item]
            if (item.path === target) return currentPath;
            if (!!item.children && item.children.length > 0) {
                const result = findParentPath(item.children, target, currentPath)
                if (result.length > 0) return result;
            }
        }
        return [];
    }

    useEffect(() => {
        const pathList = () => {
            // 確保pathnames路徑長度大於0
            if (!!pathnames && pathnames.length > 0) return findParentPath(list, pathnames[pathnames.length - 1]);
            return []
        };
        setpathList(pathList);

        return () => {

        }
    }, [location.pathname])




    return (
        <Box sx={{ p: 2 }}>
            <MuiBreadcrumbs aria-label="breadcrumb">
                <Link to="/" className="text-sky-700">Home</Link>
                {pathList.map((item, index) => {
                    const nolink = (index === pathnames.length - 1) || item.path === "";
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                    return nolink ? (
                        <span key={to}>{item.name}</span>
                    ) : (
                        <Link key={to} to={to} className="text-sky-700" >
                            {item.name}
                        </Link>
                    );
                })}
            </MuiBreadcrumbs>
        </Box>
    );
};

export default Breadcrumbs