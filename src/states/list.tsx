import { atom } from "jotai";
import { MenuItem } from "../types/menu";
import { FaUserCircle } from 'react-icons/fa';
import { BsClipboard2Data, BsBuilding } from 'react-icons/bs';
import { IoMdBusiness } from 'react-icons/io';
import { CiDeliveryTruck } from 'react-icons/ci';
import { MdOutlineStoreMallDirectory, MdShoppingCart, MdConstruction } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { PiWarehouseDuotone } from 'react-icons/pi';
import { LuShoppingBag } from 'react-icons/lu';
import { SiStarbucks, SiCarrefour } from 'react-icons/si';
import { FaStore, FaUsers, FaBoxes, FaRegClipboard } from 'react-icons/fa';



import Admin_user from "../Pages/Admin_user";


export const sideBarMenuData = atom<MenuItem[]>([
    {
        name: "範例",
        path: "Example",
        icon: <FaUsers />,
    },
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
                name: "角色管理",
                path: "role",
                icon: <FaUserCircle />,
            },
            {
                name: "權限管理",
                path: "permission",
                icon: <FaUserCircle />,
            },
            {
                name: "一二三四五六七八九",
                path: "",
                icon: <FaUserCircle />,
                children: [
                    {
                        name: "一二三四五六七八",
                        path: "test1",
                        icon: <MdConstruction />,
                    },
                    {
                        name: "test2",
                        path: "test2",
                        icon: <MdConstruction />,
                    },
                    {
                        name: "test3",
                        path: "test3",
                        icon: <MdConstruction />,
                    },
                ]
            },
        ]
    },
    {
        name: "基本資料",
        path: "",
        icon: <BsClipboard2Data />,
        children: [
            {
                name: "馬修",
                path: "",
                icon: <BsBuilding />,
                children: [
                    {
                        name: "商品維護",
                        path: "product_maintenance",
                        icon: <LuShoppingBag />,
                    },
                    // {
                    //     name: "商品對照查詢",
                    //     path: "product_comparison",
                    //     icon: <PiWarehouseDuotone />,
                    // },
                    {
                        name: "商品對照查詢",
                        path: "channel_erp_product_mapping",
                        icon: <LuShoppingBag />,
                    },
                    {
                        name: "倉庫維護",
                        path: "company_warehouse",
                        icon: <PiWarehouseDuotone />,
                    },
                ]
            },
            {
                name: "通路商",
                path: "",
                icon: <BsBuilding />,

            },
        ]
    },
    {
        name: "全聯",
        path: "",
        icon: <FaStore />,
        children: [
            {
                name: "訂單轉入平台",
                path: "pxmart_order_import",
                icon: <MdShoppingCart />,
            },
            {
                name: "訂單維護作業",
                path: "pxmart_order_maintenance",
                icon: <FaRegClipboard />,
            },
            {
                name: "訂單管理查詢",
                path: "pxmart_order_management",
                icon: <FaRegClipboard />,
            },
            {
                name: "訂單轉出銷貨",
                path: "pxmart_order_export",
                icon: <MdShoppingCart />,
            },
            {
                name: "庫存管理查詢",
                path: "pxmart_inventory_management",
                icon: <FaBoxes />,
            },
        ]
    },
    {
        name: "星巴克",
        path: "",
        icon: <SiStarbucks />,
        children: [
            {
                name: "訂單轉入平台",
                path: "starbucks_order_import",
                icon: <MdShoppingCart />,
            },
            {
                name: "訂單維護作業",
                path: "starbucks_order_maintenance",
                icon: <FaRegClipboard />,
            },
            {
                name: "訂單管理查詢",
                path: "starbucks_order_management",
                icon: <FaRegClipboard />,
            },
            {
                name: "訂單轉出銷貨",
                path: "starbucks_order_export",
                icon: <MdShoppingCart />,
            },
            {
                name: "庫存管理查詢",
                path: "starbucks_inventory_management",
                icon: <FaBoxes />,
            },
        ]
    },
    {
        name: "超商",
        path: "",
        icon: <FaStore />,
        children: [
            // {
            //     name: "訂單轉入平台",
            //     path: "convenience_store_order_import",
            //     icon: <MdShoppingCart />,
            // },
            {
                name: "訂單維護作業",
                path: "convenience_store_order_maintenance",
                icon: <FaRegClipboard />,
            },
            {
                name: "訂單管理查詢",
                path: "convenience_store_order_management",
                icon: <FaRegClipboard />,
            },
            {
                name: "訂單轉出銷貨",
                path: "convenience_store_order_export",
                icon: <MdShoppingCart />,
            },
            {
                name: "庫存管理查詢",
                path: "convenience_store_inventory_management",
                icon: <FaBoxes />,
            },
        ]
    },
    {
        name: "家樂福",
        path: "",
        icon: <SiCarrefour />,
        children: [
            {
                name: "量販",
                path: "carrefour_hypermarket",
                icon: <FaStore />,
                children: [],
            },
            {
                name: "便利購",
                path: "carrefour_convenience",
                icon: <FaStore />,
                children: [],
            },
            {
                name: "Mina",
                path: "carrefour_mina",
                icon: <FaStore />,
                children: [],
            },
        ]
    },
    {
        name: "經銷商",
        path: "",
        icon: <FaUsers />,
        children: [
            {
                name: "經銷商A",
                path: "distributor_a",
                icon: <FaUsers />,
                children: [],
            },
            {
                name: "經銷商B",
                path: "distributor_b",
                icon: <FaUsers />,
                children: [],
            },
            {
                name: "經銷商C",
                path: "distributor_c",
                icon: <FaUsers />,
                children: [],
            },
            {
                name: "經銷商D",
                path: "distributor_d",
                icon: <FaUsers />,
                children: [],
            },
        ]
    },
    {
        name: "團購",
        path: "group_purchase",
        icon: <FaUsers />,
    },
    {
        name: "異業合作",
        path: "cross_industry_collaboration",
        icon: <FaUsers />,
    },
])