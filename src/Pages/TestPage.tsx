// import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
// import { useAtom } from 'jotai';
// import { gridApiRefAtom } from '../../../../states/table';

import DataTablePage from "../components/dataTablePage";
import { FetchActionsType } from "../types/fetch";
import { ModalFieldConfig } from "../types/modal";
import { useFetch } from "../utils/fetchUrls";

interface Type {
    id: string;
    orderNumber: string;
    orderDate: string;
    orderPrice: string;
    type: string;
    storeId: string;
    storeName: string;
    userId: string;
    userUsername: string;
    userName: string;
    status: string;
    creatorId: string;
    modifierId: string;
    createdAt: string;
    updatedAt: string;
    creator: string;
    modifier: string;
    products: {
        id: number;
        promoProductSkuId: number;
        promoProductSkuName: string;
        quantity: string;
        unitPrice: string;
        totalPrice: string;
    }[];
}
export const promoPurchaseOrders = {
    // id: "限量員購訂單代號",
    orderNumber: "訂單單號",
    orderDate: "訂單日期",
    orderPrice: "訂單總額",
    // type: "訂單類別",
    // storeId: "門市代號",
    storeName: "門市名稱",
    // userId: "使用者代號",
    userUsername: "使用者帳號",
    userName: "使用者名稱",
    status: "訂單狀態",
    createdAt: "建立時間",
    updatedAt: "修改時間",
    // creatorId: "建立人員",
    // modifierId: "修改人員",
    creator: "新增者",
    modifier: "修改者",
};

const detail = {
    id: "id",
    promoProductSkuId: "商品ID",
    promoProductSkuName: "商品名稱",
    quantity: "數量",
    unitPrice: "單價",
    totalPrice: "總價"
}

const fields: ModalFieldConfig[] = [
    { name: "id", label: "訂單代號", type: "text" },
    { name: "orderNumber", label: "訂單單號", type: "text", param: true },
    { name: "startDate", label: "訂單日期(起)", type: "date", param: true },
    { name: "endDate", label: "訂單日期(迄)", type: "date", param: true },
    { name: "orderPrice", label: "訂單總額", type: "text" },
    { name: "type", label: "訂單類別", type: "text" },
    { name: "storeId", label: "門市代號", type: "text" },
    { name: "storeName", label: "門市名稱", type: "text" },
    { name: "userId", label: "使用者代號", type: "text" },
    { name: "userUserName", label: "使用者名稱", type: "text" },
    { name: "userName", label: "使用者姓名", type: "text" },
    { name: "status", label: "訂單狀態", type: "text" },
    { name: "createdAt", label: "建立時間", type: "text" },
    { name: "updatedAt", label: "修改時間", type: "text" },
    { name: "creatorId", label: "建立人員", type: "text" },
    { name: "modifierId", label: "修改人員", type: "text" },
    { name: "creator", label: "新增者", type: "text" },
    { name: "modifier", label: "修改者", type: "text" },
];

const data = [
    {
        "id": "1",
        "orderNumber": "202508050001",
        "orderDate": "2025-08-05",
        "orderPrice": "360",
        "type": "1",
        "storeId": "1",
        "storeName": "廠內自取",
        "userId": "1",
        "userUsername": "A1140619",
        "userName": "陳威廷",
        "status": "0",
        "creatorId": "1",
        "modifierId": "0",
        "createdAt": "2025-08-05 11:11:05",
        "updatedAt": "2025-08-05 11:11:05",
        "creator": "陳威廷",
        "modifier": "",
        "products": [
            {
                "id": 1,
                "promoProductSkuId": 1,
                "promoProductSkuName": "員購星巴克優格飲-玫瑰蘋果口味 一組六瓶",
                "quantity": "1",
                "unitPrice": "360",
                "totalPrice": "360"
            },
            {
                "id": 2,
                "promoProductSkuId": 1,
                "promoProductSkuName": "員購星巴克優格飲-玫瑰蘋果口味 一組六瓶",
                "quantity": "1",
                "unitPrice": "360",
                "totalPrice": "360"
            },
            {
                "id": 3,
                "promoProductSkuId": 1,
                "promoProductSkuName": "員購星巴克優格飲-玫瑰蘋果口味 一組六瓶",
                "quantity": "1",
                "unitPrice": "360",
                "totalPrice": "360"
            },
            {
                "id": 4,
                "promoProductSkuId": 1,
                "promoProductSkuName": "員購星巴克優格飲-玫瑰蘋果口味 一組六瓶",
                "quantity": "1",
                "unitPrice": "360",
                "totalPrice": "360"
            },
            {
                "id": 5,
                "promoProductSkuId": 1,
                "promoProductSkuName": "員購星巴克優格飲-玫瑰蘋果口味 一組六瓶",
                "quantity": "1",
                "unitPrice": "360",
                "totalPrice": "360"
            },
        ]
    },
    {
        "id": "2",
        "orderNumber": "202508050001",
        "orderDate": "2025-08-05",
        "orderPrice": "360",
        "type": "1",
        "storeId": "1",
        "storeName": "廠內自取",
        "userId": "1",
        "userUsername": "A1140619",
        "userName": "陳威廷",
        "status": "0",
        "creatorId": "1",
        "modifierId": "0",
        "createdAt": "2025-08-05 11:11:05",
        "updatedAt": "2025-08-05 11:11:05",
        "creator": "陳威廷",
        "modifier": "",
        "products": [
            {
                "id": 1,
                "promoProductSkuId": 1,
                "promoProductSkuName": "員購星巴克優格飲-玫瑰蘋果口味 一組六瓶",
                "quantity": "1",
                "unitPrice": "360",
                "totalPrice": "360"
            },
            {
                "id": 2,
                "promoProductSkuId": 1,
                "promoProductSkuName": "員購星巴克優格飲-玫瑰蘋果口味 一組六瓶",
                "quantity": "1",
                "unitPrice": "360",
                "totalPrice": "360"
            },
            {
                "id": 3,
                "promoProductSkuId": 1,
                "promoProductSkuName": "員購星巴克優格飲-玫瑰蘋果口味 一組六瓶",
                "quantity": "1",
                "unitPrice": "360",
                "totalPrice": "360"
            },
            {
                "id": 4,
                "promoProductSkuId": 1,
                "promoProductSkuName": "員購星巴克優格飲-玫瑰蘋果口味 一組六瓶",
                "quantity": "1",
                "unitPrice": "360",
                "totalPrice": "360"
            },
            {
                "id": 5,
                "promoProductSkuId": 1,
                "promoProductSkuName": "員購星巴克優格飲-玫瑰蘋果口味 一組六瓶",
                "quantity": "1",
                "unitPrice": "360",
                "totalPrice": "360"
            },
        ]
    },
    {
        "id": "3",
        "orderNumber": "202508050001",
        "orderDate": "2025-08-05",
        "orderPrice": "360",
        "type": "1",
        "storeId": "1",
        "storeName": "廠內自取",
        "userId": "1",
        "userUsername": "A1140619",
        "userName": "陳威廷",
        "status": "0",
        "creatorId": "1",
        "modifierId": "0",
        "createdAt": "2025-08-05 11:11:05",
        "updatedAt": "2025-08-05 11:11:05",
        "creator": "陳威廷",
        "modifier": "",
        "products": [
            {
                "id": 1,
                "promoProductSkuId": 1,
                "promoProductSkuName": "員購星巴克優格飲-玫瑰蘋果口味 一組六瓶",
                "quantity": "1",
                "unitPrice": "360",
                "totalPrice": "360"
            },
            {
                "id": 2,
                "promoProductSkuId": 1,
                "promoProductSkuName": "員購星巴克優格飲-玫瑰蘋果口味 一組六瓶",
                "quantity": "1",
                "unitPrice": "360",
                "totalPrice": "360"
            },
            {
                "id": 3,
                "promoProductSkuId": 1,
                "promoProductSkuName": "員購星巴克優格飲-玫瑰蘋果口味 一組六瓶",
                "quantity": "1",
                "unitPrice": "360",
                "totalPrice": "360"
            },
            {
                "id": 4,
                "promoProductSkuId": 1,
                "promoProductSkuName": "員購星巴克優格飲-玫瑰蘋果口味 一組六瓶",
                "quantity": "1",
                "unitPrice": "360",
                "totalPrice": "360"
            },
            {
                "id": 5,
                "promoProductSkuId": 1,
                "promoProductSkuName": "員購星巴克優格飲-玫瑰蘋果口味 一組六瓶",
                "quantity": "1",
                "unitPrice": "360",
                "totalPrice": "360"
            },
        ]
    },
]

// 常數設定
type PAGE_ENTITY_TYPE = Type; // 資料類型
const PAGE_TABLE_ENTITY = promoPurchaseOrders;         // 資料結構定義
const PAGE_API_HOOK = useFetch;     // API Hook

const TestPage = () => {

    const api = {
        get: () => Promise.resolve({ data, success: true, message: "" }),
        post: () => Promise.resolve({ data: undefined, success: true, message: "" }),
        put: () => Promise.resolve({ data: undefined, success: true, message: "" }),
        delete: () => Promise.resolve({ data: undefined, success: true, message: "" }),
    }

    return (
        <>
            {/* <Button onClick={test}>t</Button> */}
            <DataTablePage<PAGE_ENTITY_TYPE>
                dataType={PAGE_TABLE_ENTITY}
                fetchApi={() => api}
                // paginationMode
                paramFields={fields}
                // customColumns={customColumns}
                detailKey="products"
                detailFields={detail}
                selectMode
                multiSelect
            />
        </>
    )
}

export default TestPage