import { atom } from "jotai";
import { MenuItem } from "../types/menu";
import { FaUserCircle } from 'react-icons/fa';
import { BsClipboard2Data, BsBuilding } from 'react-icons/bs';
import { MdConstruction, MdOutlineStoreMallDirectory } from 'react-icons/md';
import { PiWarehouseDuotone } from 'react-icons/pi';
import { LuShoppingBag } from 'react-icons/lu';
import { FaUsers } from 'react-icons/fa';



import Admin_user from "../Pages/Admin_user";
import { IoMdBusiness } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";


export const sideBarMenuData = atom<MenuItem[]>([
    {
        name: "範例",
        path: "Example",
        icon: <FaUsers />,
    },
    {
        name: "系統管理",
        path: "admin",
        icon: <FaUserCircle />,
        children: [
            {
                name: "管理員管理",
                path: "admin/admin_user",
                icon: <FaUserCircle />,
                pageNode: <Admin_user />,
            },
            {
                name: "角色管理",
                path: "admin/role",
                icon: <FaUserCircle />,
            },
            {
                name: "權限管理",
                path: "admin/permission",
                icon: <FaUserCircle />,
            },
            {
                name: "一二三四五六七八九",
                path: "admin/123456789",
                icon: <FaUserCircle />,
                children: [
                    {
                        name: "一二三四五六七八",
                        path: "admin/123456789/test1",
                        icon: <MdConstruction />,
                    },
                    {
                        name: "test2",
                        path: "admin/123456789/test2",
                        icon: <MdConstruction />,
                    },
                    {
                        name: "test3",
                        path: "admin/123456789/test3",
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
                name: "通路商",
                path: "",
                icon: <BsBuilding />,
                children: [
                    {
                        name: "通路商維護",
                        path: "basic_data/channel/channel_basic_info",
                        pageNode: <>通路商維護</>,
                        icon: <BsBuilding />,
                        noSideBarRoute: [
                            {
                                name: "詳細資料",
                                path: "basic_data/channel/channel_basic_info/:id",
                                pageNode: <></>,
                                noSideBarRoute: [
                                    {
                                        name: "路由測試1111",
                                        path: "basic_data/channel/channel_basic_info/:id/test",
                                        pageNode: <></>,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: "通路物流中心維護",
                        path: "basic_data/channel/sales_channel_logistics",
                        icon: <IoMdBusiness />,
                        pageNode: <></>,
                    },
                    {
                        name: "通路門市維護",
                        path: "basic_data/channel/channel_store_info",
                        icon: <MdOutlineStoreMallDirectory />,
                        pageNode: <></>,
                    },
                    {
                        name: "代送商維護",
                        path: "basic_data/channel/agent_basic_info",
                        icon: <CiDeliveryTruck />,
                        pageNode: <></>,
                    },
                    {
                        name: "代送商倉庫維護",
                        path: "basic_data/channel/agent_warehouse",
                        icon: <PiWarehouseDuotone />,
                        pageNode: <></>,
                    },
                    {
                        name: "代送商門市維護",
                        path: "basic_data/channel/agent_store",
                        icon: <TbTruckDelivery />,
                        pageNode: <></>,
                    },
                    {
                        name: "通路商品維護",
                        path: "basic_data/channel/channel_products",
                        icon: <LuShoppingBag />,
                    },
                    {
                        name: "通路門市商品維護",
                        path: "basic_data/channel/store_products",
                        icon: <LuShoppingBag />,
                        pageNode: <></>,
                    },
                    {
                        name: "通路商品允收日期",
                        path: "basic_data/channel/channel_product_acceptance_date",
                        icon: <LuShoppingBag />,
                    },
                    {
                        name: "通路商品單位換算",
                        path: "basic_data/channel/channel_product_unit_conversion",
                        icon: <LuShoppingBag />,
                    },
                ],
            },
        ]
    },
])