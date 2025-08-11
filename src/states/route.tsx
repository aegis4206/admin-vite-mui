import { atom } from "jotai";
import { BackEndMenuItem, MenuItem } from "../types/menu";
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineManageAccounts } from 'react-icons/md';

import { RiAdminLine } from "react-icons/ri";

import { lazy } from "react";

export const iconMap = {
    RiAdminLine: <RiAdminLine />,
    FaUserCircle: <FaUserCircle />,
    MdOutlineManageAccounts: <MdOutlineManageAccounts />,
};


export const componentMap = {
    TestPage: lazy(() => import('../Pages/TestPage')),
    Auth_user: lazy(() => import('../Pages/System/Auth/Auth_user')),
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
                        path: "system/auth/user",
                        icon: "RiAdminLine",
                        pageNode: "Auth_user",
                    },
                    {
                        name: "角色管理",
                        path: "system/role",
                        icon: "FaUserCircle",
                    },
                    {
                        name: "權限管理",
                        path: "system/permission",
                        icon: "FaUserCircle",
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