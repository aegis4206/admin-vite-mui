import { useState, useRef } from 'react';
import DataTablePage from '../../../components/dataTablePage';
import { useAuthPermissions } from '../../../utils/fetchUrls';
import { Grid2, Typography, Checkbox, FormControlLabel, FormGroup, Box } from '@mui/material';
import ModalTool from '../../../components/modalTool';
import { ModalFieldConfig } from '../../../types/modal';
import { useAtom } from 'jotai';
import { modalMessageAtom } from '../../../states/modal';
import { authPermission, AuthPermissionType, permissionNameMap } from '../../../types/System/Auth/auth';

// 常數設定
type PAGE_ENTITY_TYPE = AuthPermissionType; // 資料類型
const PAGE_TABLE_ENTITY = authPermission;         // 資料結構定義
const PAGE_API_HOOK = useAuthPermissions;     // API Hook
const PAGE_TITLE = "權限管理";         // 頁面標題

const fields: ModalFieldConfig[] = [
    { name: "path", label: "權限代碼", type: "text", validation: ["isEmpty"], param: true },
    { name: "name", label: "權限名稱", type: "text", validation: ["isEmpty"], param: true },
    { name: "sort", label: "排序", type: "number", validation: ["isEmpty"] },
];

const initData: AuthPermissionType = {
    id: "",
    path: "",
    name: "",
    sort: 0,
    createdAt: "",
    updatedAt: "",
    creatorId: "",
    modifierId: "",
    creator: "",
    modifier: "",
    permissions: ["view", "create", "edit", "delete", "import", "detail", "close"],
}

// const data = [
//     {
//         path: "system/auth/users",
//         name: "使用者管理",
//         sort: "1001",
//         permission: ["view", "create", "edit", "delete"],
//         createdAt: "建立時間",
//         updatedAt: "修改時間",
//         creator: "新增者",
//         modifier: "修改者",
//     },
//     {
//         path: "system/auth/roles",
//         name: "角色管理",
//         sort: "1002",
//         permission: ["view", "create", "edit", "delete"],
//         createdAt: "建立時間",
//         updatedAt: "修改時間",
//         creator: "新增者",
//         modifier: "修改者",
//     }
// ]

const Permissions = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [formData, setFormData] = useState(initData);
    const [modalFields,] = useState(fields);
    const tableRef = useRef<{ getData: () => void }>(null);
    const titleMode = modalMode === "add" ? "新增" : modalMode === "edit" ? "編輯" : "刪除";

    const pageApi = PAGE_API_HOOK<PAGE_ENTITY_TYPE>();
    const [, setModalMessage] = useAtom(modalMessageAtom)


    // 勾選/取消單一權限
    const handlePermissionToggle = (permName: string) => {
        setFormData((prev) => ({
            ...prev,
            permissions: prev.permissions.includes(permName)
                ? prev.permissions.filter((p) => p !== permName)
                : [...prev.permissions, permName]
        }));
    };


    const onEdit = (row: PAGE_ENTITY_TYPE & { permissions?: string[] }) => {
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
                確定要刪除{row.name}權限嗎？
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
            />
            <ModalTool
                open={open}
                setOpen={setOpen}
                title={`${titleMode}${PAGE_TITLE}`}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                fields={modalFields}
            >
                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1">權限設定</Typography>
                    <FormGroup row>
                        {
                            Array.isArray(formData.permissions) && Object.keys(permissionNameMap).map((perm) => {
                                return (
                                    <FormControlLabel
                                        key={perm}
                                        label={permissionNameMap[perm as keyof typeof permissionNameMap] || perm}
                                        control={
                                            <Checkbox
                                                checked={formData.permissions.includes(perm)}
                                                onChange={() => handlePermissionToggle(perm)}
                                            />
                                        }
                                    />
                                )
                            }
                            )
                        }
                    </FormGroup>
                </Box>
            </ModalTool>
        </>
    );
};

export default Permissions;