import { atom } from "jotai";
import { Fa0, Fa1, Fa2 } from "react-icons/fa6";
import { MenuItem } from "../types/menu";
import { FaUserCircle } from "react-icons/fa";
import Admin_user from "../Pages/Admin_user";

export const sideBarMenuData = atom<MenuItem[]>([
    {
        name: "系統管理",
        path: "",
        icon: <FaUserCircle />,
        children: [
            {
                name: "管理員管理",
                path: "admin_user",
                icon: <FaUserCircle />,
                pageNode: <Admin_user />,
            },
            {
                name: "腳色管理",
                path: "role",
                icon: <FaUserCircle />,
            },
            {
                name: "權限管理",
                path: "permission",
                icon: <FaUserCircle />,
            },
            {
                name: "第三層測試",
                path: "",
                icon: <FaUserCircle />,
                children: [
                    {
                        name: "test1",
                        path: "test1",
                        icon: <Fa2 />,
                    },
                    {
                        name: "test2",
                        path: "test2",
                        icon: <Fa2 />,
                    },
                    {
                        name: "test3",
                        path: "test3",
                        icon: <Fa2 />,
                    },
                ]
            },
        ]
    },
    {
        name: "通路管理",
        path: "",
        icon: <Fa0 />,
        children: [
            {
                name: "通路基本資料",
                path: "channel_basic_info",
                icon: <Fa1 />,
            },
            {
                name: "代送商基本資料",
                path: "agent_basic_info",
                icon: <Fa1 />,
            },
            {
                name: "通路門市基本資料",
                path: "channel_store_info",
                icon: <Fa1 />,
            },
            {
                name: "代送商門市",
                path: "agent_store",
                icon: <Fa1 />,
            },
            {
                name: "代送商倉庫",
                path: "agent_warehouse",
                icon: <Fa1 />,
            },
            {
                name: "門市商品",
                path: "store_products",
                icon: <Fa1 />,
            },
        ]
    },
    {
        name: "倉庫管理",
        path: "",
        icon: <Fa0 />,
        children: [
            {
                name: "倉庫基本資料",
                path: "warehouse_basic_info",
                icon: <Fa1 />,
            },
        ]
    },
    {
        name: "商品管理",
        path: "",
        icon: <Fa0 />,
        children: [
            {
                name: "商品基本資料",
                path: "product_basic_info",
                icon: <Fa1 />,
            },
        ]
    },
    {
        name: "測試",
        path: "",
        icon: <Fa0 />,
        children: [
            {
                name: "API測試",
                path: "posts",
                icon: <Fa1 />,
            },
        ]
    },
])