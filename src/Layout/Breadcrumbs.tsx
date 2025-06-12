import { useLocation, Link } from "react-router-dom";
import { Box, Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import { sideBarMenuData } from "../states/route";
import { MenuItem } from "../types/menu";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";

const Breadcrumbs = () => {
    const [pathList, setPathList] = useState<MenuItem[]>([]);
    const [list,] = useAtom<MenuItem[]>(sideBarMenuData)
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(x => x);

    // const findParentPath = (menuItemArr: MenuItem[], target: string, path: MenuItem[] = []): MenuItem[] => {
    //     for (const item of menuItemArr) {
    //         const currentPath = [...path, item]
    //         if (item.path === target) return currentPath;
    //         if (!!item.children && item.children.length > 0) {
    //             const result = findParentPath(item.children, target, currentPath)
    //             if (result.length > 0) return result;
    //         }
    //     }
    //     return [];
    // }
    // const findParentPath = (
    //     menuItemArr: MenuItem[],
    //     target: string,
    //     path: MenuItem[] = []
    // ): MenuItem[] => {
    //     for (const item of menuItemArr) {
    //         const currentPath = [...path, item];

    //         // 如果當前項目的路徑匹配目標路徑，返回當前路徑
    //         if (item.path === target) {
    //             return currentPath;
    //         }

    //         // 檢查並遞迴處理 children
    //         if ("children" in item && item.children && item.children.length > 0) {
    //             const result = findParentPath(item.children, target, currentPath);
    //             if (result.length > 0) return result;
    //         }

    //         // 檢查並遞迴處理 noSideBarRoute
    //         if (
    //             "noSideBarRoute" in item &&
    //             item.noSideBarRoute &&
    //             item.noSideBarRoute.length > 0
    //         ) {
    //             const result = findParentPath(item.noSideBarRoute, target, currentPath);
    //             if (result.length > 0) return result;
    //         }
    //     }

    //     // 如果沒有找到匹配的路徑，返回空陣列
    //     return [];
    // };


    const findParentPath = (
        menuItemArr: MenuItem[],
        target: string,
        path: MenuItem[] = []
    ): MenuItem[] => {
        for (const item of menuItemArr) {
            const currentPath = [...path, item];

            // 將路徑中的動態參數轉換為正則表達式模式
            const pathPattern = item.path.replace(/:[^/]+/g, "[^/]+");
            const regex = new RegExp(`^${pathPattern}$`);


            // 分割當前項目路徑和目標路徑
            const itemSegments = item.path.split("/").filter(Boolean);
            const targetSegments = target.split("/").filter(Boolean);
            let isMatch = true;
            // 逐段比較路徑
            if (itemSegments.length <= targetSegments.length) {
                for (let i = 0; i < itemSegments.length; i++) {
                    if (itemSegments[i].startsWith(":")) continue; // 動態參數跳過檢查
                    if (itemSegments[i] !== targetSegments[i]) {
                        isMatch = false;
                        break;
                    }
                }
            } else {
                isMatch = false;
            }

            // 如果當前節點匹配目標路徑的一部分
            if (isMatch || regex.test(target)) {
                // 如果當前路徑完全匹配目標路徑，返回結果
                if (item.path === target || regex.test(target)) {
                    return currentPath;
                }

                // 檢查並遞迴處理 children
                if ("children" in item && item.children && item.children.length > 0) {
                    const result = findParentPath(item.children, target, currentPath);
                    if (result.length > 0) return result;
                }

                // 檢查並遞迴處理 noSideBarRoute
                if (
                    "noSideBarRoute" in item &&
                    item.noSideBarRoute &&
                    item.noSideBarRoute.length > 0
                ) {
                    const result = findParentPath(item.noSideBarRoute, target, currentPath);
                    if (result.length > 0) return result;
                }
            }
        }

        return [];
    };

    useEffect(() => {
        const newPathList = () => {
            // 確保pathnames路徑長度大於0
            if (!!pathnames && pathnames.length > 0) return findParentPath(list, pathnames.join("/"));
            return []
        };
        setPathList(newPathList);
        return () => {

        }
    }, [location.pathname])




    return (
        <Box sx={{ p: 2 }}>
            <MuiBreadcrumbs aria-label="breadcrumb">
                <Link to="/" className="text-sky-700">Home</Link>
                {pathList.map((item, index) => {
                    // const includesId = item.path.split("/").slice(-1)[0] === ":id";
                    const nolink = item.path === "" || !item.pageNode;
                    // 處理網址參數
                    const indexTarget = item.path.includes(":") ? index + 2 : index + 1;
                    const to = `/${pathnames.slice(0, indexTarget).join("/")}`;
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