import { useState, useRef, useEffect } from 'react';
import DataTablePage from '../components/dataTablePage';
import { useFetch } from '../utils/fetchUrls';
import { GridValueGetter } from '@mui/x-data-grid';
import { FormControl, InputLabel, MenuItem, Select, Typography, Grid2 } from '@mui/material';
import ModalTool from '../components/modalTool';
import { ModalFieldConfig } from '../types/modal';
import { useAtom } from 'jotai';
import { modalMessageAtom } from '../states/modal';
import { GridApiCommunity } from '@mui/x-data-grid/internals';

export interface TestType {
    id: string;
    name: string;
    createdAt: string;
    updateAt: string;
    creator: string;
    modifier: string;
}

export const test = {
    id: "代號",
    name: "名稱",
    createdAt: "建立時間",
    updateAt: "修改時間",
    creator: "新增者",
    modifier: "修改者",
};


// 常數設定
type PAGE_ENTITY_TYPE = TestType; // 資料類型
const PAGE_ENTITY = test;         // 資料結構定義
const PAGE_API_HOOK = useFetch;     // API Hook
const PAGE_TITLE = "Example";         // 頁面標題

const fields: ModalFieldConfig[] = [
    // param: true 代表會帶到搜尋參數裡
    { name: "id", label: "代號", type: "text", disabled: true },
    { name: "name", label: "名稱", type: "text", validation: ["isEmpty"], param: true },
    { name: "count", label: "數量", type: "number", validation: ["isPositiveInteger"] },
    { name: "createdAt", label: "建立時間", type: "text", disabled: true },
    { name: "updateAt", label: "修改時間", type: "text", disabled: true },
    { name: "creator", label: "新增者", type: "text", disabled: true },
    { name: "modifier", label: "修改者", type: "text", disabled: true },
];
const initData: PAGE_ENTITY_TYPE = {
    id: "",
    name: "",
    createdAt: "",
    updateAt: "",
    creator: "",
    modifier: "",
}


const Example = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
    const [formData, setFormData] = useState(initData);
    const [modelFields, setModalFields] = useState(fields);
    const tableRef = useRef<{ getData: () => void }>(null);
    const titleMode = modalMode === "add" ? "新增" : modalMode === "edit" ? "編輯" : "刪除";
    const pageApi = PAGE_API_HOOK();
    const [, setModalMessage] = useAtom(modalMessageAtom)
    const gridApiRef = useRef<GridApiCommunity | null>(null)


    const customRenderers = {
        name: {
            field: "name",
            valueGetter: (value: GridValueGetter) => {
                switch (Number(value)) {
                    case 1: return "使用者1";
                    case 2: return "使用者2";
                    default: return "";
                }
            },
        }
    };



    const onEdit = (row: PAGE_ENTITY_TYPE) => {
        console.log(row);
        setModalMode("edit");
        setFormData(row);
        setOpen(true);

    };


    const onAdd = () => {
        setModalMode("add");
        setFormData({ ...initData });
        setOpen(true);
    }

    const onDelete = (row: PAGE_ENTITY_TYPE) => {
        setModalMessage({
            open: true,
            title: `刪除${PAGE_TITLE}`,
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const result = await pageApi.delete(row);
                if (result.success) {
                    setModalMessage((prev) => prev ? { ...prev, open: false } : undefined)
                    setTimeout(() => {
                        tableRef.current?.getData();
                    }, 500);
                }
            },
            children: <Typography variant="body1" component="p">
                確定要刪除{PAGE_TITLE}{row.name}的資料嗎？
            </Typography>
        })
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const selectedRows = [...(gridApiRef.current?.getSelectedRows().values() || [])];
        console.log(formData, selectedRows);
        const api = {
            add: () => pageApi.post(formData),
            edit: () => pageApi.put(formData),
            delete: () => pageApi.delete(formData),
        }

        const result = await api[modalMode]();
        if (result.success) {
            setOpen(false);
            setTimeout(() => {
                tableRef.current?.getData();
            }, 500);
        }
    }

    const handleSelectChange = (name: string, value: unknown) => {
        console.log(name, value);
    };

    const fieldsCheck = async () => {
        const newFields = await Promise.all(fields.map<Promise<ModalFieldConfig>>(async (field) => {
            if (field.name === 'name') {
                const result = await pageApi.get();
                if (result.success) {
                    const temp = { ...field };
                    temp.options = (result.data as PAGE_ENTITY_TYPE[]).map((data) => ({ value: data.id, label: data.name }));
                    return temp;
                }
            }
            return field;
        }));
        setModalFields(newFields);
    }


    useEffect(() => {
        fieldsCheck()
        return () => {
        }
    }, [])


    const customField = {
        id: (field: ModalFieldConfig) => <FormControl key={field.name} fullWidth>
            <InputLabel>{field.label}</InputLabel>
            <Select
                label={field.label}
                name={field.name}
                value={formData[field.name as keyof PAGE_ENTITY_TYPE] as string | number}
                onChange={(event) => handleSelectChange(field.name, event.target.value)}
            >
                {field.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    }



    return (
        <>
            <Grid2 size={{ xs: 12, sm: 12 }}>
                <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
                    {PAGE_TITLE}
                </Typography>
            </Grid2>
            <DataTablePage<PAGE_ENTITY_TYPE>
                dataType={PAGE_ENTITY}
                fetchApi={PAGE_API_HOOK}
                customRenderers={customRenderers}
                onEdit={onEdit}
                onAdd={onAdd}
                onDelete={onDelete}
                ref={tableRef}
                gridApiRef={gridApiRef}
                paramFields={fields}
                viewOnly // 只能看不能改，關閉CRUD
                detailAction // 顯示詳細頁按鈕，規則為routes/{id}/route_detail
                paginationMode // 分頁SSR模式
                exportUrl="/tests/export" // 匯出功能，輸入後端匯出API路徑
                importFileApi={useFetch} // 匯入功能，輸入API Hook
                exampleUrl="/tests/example" // 範例下載，輸入後端API路徑
                selectMode // 開啟選取模式
                multiSelect // 開啟多選框
            />
            <ModalTool
                open={open}
                setOpen={setOpen}
                title={`${titleMode}${PAGE_TITLE}`}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                fields={modelFields}
                customField={customField}
            />
        </>
    );
};

export default Example;