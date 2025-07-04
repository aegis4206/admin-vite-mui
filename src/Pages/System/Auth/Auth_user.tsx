import { useState, useRef } from 'react';
import DataTablePage from '../../../components/dataTablePage';
import { useAuthUser } from '../../../utils/fetchUrls';
import { Grid2, Typography } from '@mui/material';
import ModalTool from '../../../components/modalTool';
import { ModalFieldConfig } from '../../../types/modal';
import { useAtom } from 'jotai';
import { modalMessageAtom } from '../../../states/modal';
import { authUser, AuthUserType } from '../../../types/System/Auth/auth';
import { GridValueGetter } from '@mui/x-data-grid';

// 常數設定
type PAGE_ENTITY_TYPE = AuthUserType; // 資料類型
const PAGE_TABLE_ENTITY = authUser;         // 資料結構定義
const PAGE_API_HOOK = useAuthUser;     // API Hook
const PAGE_TITLE = "使用者管理";         // 頁面標題

const fields: ModalFieldConfig[] = [
    { name: "username", label: "使用者名稱", type: "text", validation: ["isEmpty"] },
    { name: "password", label: "使用者密碼", type: "password" },
    { name: "name", label: "使用者全名", type: "text", validation: ["isEmpty"] },
    { name: "type", label: "使用者類型", type: "select", options: [{ value: "0", label: "員工" }, { value: "1", label: "兼職" }] },
    { name: "nickname", label: "使用者暱稱", type: "text" },
    { name: "avatar", label: "使用者頭像", type: "text" },
    { name: "email", label: "使用者信箱", type: "text" },
    { name: "phone", label: "使用者手機號碼", type: "text" },
];
const initData: AuthUserType = {
    id: "",
    username: "",
    password: "",
    type: "0",
    name: "",
    nickname: "",
    avatar: "",
    email: "",
    phone: "",
    createdAt: "",
    updatedAt: "",
    creatorId: 0,
    modifierId: 0,
    creator: "",
    modifier: "",
}

const Auth_user = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [formData, setFormData] = useState(initData);
    const [modalFields,] = useState(fields);
    const tableRef = useRef<{ getData: () => void }>(null);
    const titleMode = modalMode === "add" ? "新增" : modalMode === "edit" ? "編輯" : "刪除";
    const pageApi = PAGE_API_HOOK<PAGE_ENTITY_TYPE>();
    const [, setModalMessage] = useAtom(modalMessageAtom)

    const customRenderers = {
        type: {
            field: "type",
            valueGetter: (value: GridValueGetter) => {
                switch (Number(value)) {
                    case 0: return "員工";
                    case 1: return "代送商";
                    default: return "";
                }
            },
        },
    };

    const onEdit = (row: PAGE_ENTITY_TYPE) => {
        setModalMode("edit");
        setFormData(row);
        setOpen(true);
    };

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
                確定要刪除{row.name}使用者嗎？
            </Typography>
        })
    };

    const onAdd = () => {
        setModalMode("add");
        setFormData({ ...initData });
        setOpen(true);
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const api = {
            add: () => pageApi.post(formData),
            edit: () => pageApi.put(formData),
        };
        const result = await api[modalMode]();
        if (result.success) {
            setOpen(false);
            setTimeout(() => tableRef.current?.getData(), 500);
        }
    };


    return (
        <>
            <Grid2 size={{ xs: 12, sm: 12 }}>
                <Typography variant="h5" component="h1" sx={{ mb: 1 }}>
                    {PAGE_TITLE}
                </Typography>
            </Grid2>
            <DataTablePage<PAGE_ENTITY_TYPE>
                dataType={PAGE_TABLE_ENTITY}
                fetchApi={PAGE_API_HOOK}
                onEdit={onEdit}
                onAdd={onAdd}
                onDelete={onDelete}
                ref={tableRef}
                paramFields={fields}
                customRenderers={customRenderers}
            />
            <ModalTool
                open={open}
                setOpen={setOpen}
                title={`${titleMode}${PAGE_TITLE}`}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                fields={modalFields}
            />
        </>
    );
};

export default Auth_user;