import { atom } from "jotai";
import { BackEndMenuItem, MenuItem } from "../types/menu";
import { FaUserCircle } from 'react-icons/fa';
import { RiAdminLine } from "react-icons/ri";
import { lazy } from "react";
import { MdOutlineManageAccounts } from "react-icons/md";


export const iconMap = {
    RiAdminLine: <RiAdminLine />,
    FaUserCircle: <FaUserCircle />,
    MdOutlineManageAccounts: <MdOutlineManageAccounts />,
};


export const componentMap = {
    TestPage: lazy(() => import('../Pages/TestPage')),
    Users: lazy(() => import('../Pages/System/Auth/Users')),
    Roles: lazy(() => import('../Pages/System/Auth/Roles')),
    Permissions: lazy(() => import('../Pages/System/Auth/Permissions')),
};

// children會在sidebar顯示，noSideBarRoute則不會，且則一存在
export const backendRoutesData = atom<BackEndMenuItem[]>([
    {
        name: "系統管理",
        path: "system",
        icon: "MdOutlineManageAccounts",
        children: [
            {
                name: "帳號管理",
                path: "system/auth",
                icon: "RiAdminLine",
                children: [
                    {
                        name: "使用者管理",
                        path: "system/auth/users",
                        icon: "RiAdminLine",
                        pageNode: "Users",
                        permission: ['view', 'create', 'edit', 'delete'],
                    },
                    {
                        name: "角色管理",
                        path: "system/auth/roles",
                        icon: "FaUserCircle",
                        pageNode: "Roles",
                        permission: ['view', 'create', 'edit', 'delete'],
                    },
                    {
                        name: "權限管理",
                        path: "system/auth/permissions",
                        icon: "FaUserCircle",
                        pageNode: "Permissions",
                        permission: ['view', 'create', 'edit', 'delete'],
                    },
                ]
            },
        ],
    },
    {
        name: "測試頁面",
        path: "test_page",
        icon: "RiAdminLine",
        pageNode: "TestPage",
    },
]);
export const sideBarMenuData = atom<MenuItem[]>([]);