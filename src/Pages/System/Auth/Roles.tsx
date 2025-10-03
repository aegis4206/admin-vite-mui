import { useState, useRef, useMemo } from 'react';
import DataTablePage from '../../../components/dataTablePage';
import { useAuthRoles } from '../../../utils/fetchUrls';
import { Card, Grid2, Typography } from '@mui/material';
import { ModalFieldConfig } from '../../../types/modal';
import { useAtom } from 'jotai';
import { modalMessageAtom } from '../../../states/modal';
import { authRole, AuthRoleType } from '../../../types/System/Auth/auth';
import { BackEndMenuItem } from '../../../types/menu';
import { backendRoutesData } from '../../../states/route';
import RolePermissionMenuComponent from './RolePermissionMenuComponent';
import ModalTool from '../../../components/modalTool';
import { flattenTree } from '../../../utils/permissions';


// 常數設定
type PAGE_ENTITY_TYPE = AuthRoleType; // 資料類型
const PAGE_TABLE_ENTITY = authRole;         // 資料結構定義
const PAGE_API_HOOK = useAuthRoles;     // API Hook
const PAGE_TITLE = "角色管理";         // 頁面標題

const fields: ModalFieldConfig[] = [
    { name: "name", label: "角色名稱", type: "text", param: true },
];
const initData: AuthRoleType = {
    id: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    creatorId: "",
    modifierId: "",
    creator: "",
    modifier: "",
    permissions: [],
};


const Auth_role = () => {
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [formData, setFormData] = useState(initData);
    const tableRef = useRef<{ getData: () => void }>(null);
    const titleMode = modalMode === "add" ? "新增" : modalMode === "edit" ? "編輯" : "刪除";
    const pageApi = PAGE_API_HOOK<PAGE_ENTITY_TYPE>();
    const [, setModalMessage] = useAtom(modalMessageAtom);
    const [backendRoutes,] = useAtom<BackEndMenuItem[]>(backendRoutesData);
    const [open, setOpen] = useState<boolean>(false);


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

    const permissionInitData = useMemo(() => {
        const pathList = flattenTree(backendRoutes);
        console.log(pathList)
        const init = [] as string[];
        pathList.forEach(item => {
            if (!item.permission || item.permission.length === 0) return;
            init.push(item.path); // 自動加入主項目權限
            init.push(...item.permission.map(perm => `${item.path}.${perm}`));
        });
        return init;
    }, [backendRoutes]);


    const onAdd = () => {
        setModalMode("add");
        setFormData({ ...initData, permissions: permissionInitData });
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
                fields={fields}
            >
                <Grid2 size={12}>
                    {backendRoutes.map((route: BackEndMenuItem, index: number) => (
                        <Card variant="outlined" sx={{ mb: 2, bgcolor: "lavender" }} key={index} >
                            <RolePermissionMenuComponent item={route} level={1} formData={formData} setFormData={setFormData} />
                        </Card>
                    ))}
                </Grid2>
            </ModalTool>
        </>
    );
};

export default Auth_role;