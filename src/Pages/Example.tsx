import { useState, useRef, useEffect } from 'react';
import DataTablePage from '../components/dataTablePage';
import { useTest } from '../utils/fetchUrls';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import ModalTool from '../components/modal';
import { ModalFieldConfig } from '../types/modal';

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

const fields: ModalFieldConfig[] = [
    { name: "id", label: "代號", type: "text", disabled: true },
    { name: "name", label: "名稱", type: "text" },
    { name: "createdAt", label: "建立時間", type: "text", disabled: true },
    { name: "updateAt", label: "修改時間", type: "text", disabled: true },
    { name: "creator", label: "新增者", type: "text", disabled: true },
    { name: "modifier", label: "修改者", type: "text", disabled: true },
];
const initData: TestType = {
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
    const [modelFields, setModelFields] = useState(fields);
    const tableRef = useRef<{ getData: () => void }>(null);
    const titleMode = modalMode === "add" ? "新增" : modalMode === "edit" ? "編輯" : "刪除";
    const testApi = useTest();

    const customRenderers = {
        name: (param: GridRenderCellParams) => {
            switch (param.value) {
                case 1: return "使用者1";
                case 2: return "使用者2";
                default: return "";
            }
        },
    };


    const onEdit = (row: TestType) => {
        console.log(row);
        setModalMode("edit");
        setFormData(row);
        setOpen(true);

    };
    const handleSelecthange = (name: string, value: unknown) => {

    };

    const fieldsCheck = () => {
        const newFields: ModalFieldConfig[] = fields.map((field) => {
            if (field.name === 'name') {

                return field;
            }
            return field;
        });

        setModelFields(newFields);
    }

    useEffect(() => {
        fieldsCheck()
        testApi.get();
        return () => {
        }
    }, [])


    const customField = {
        id: (field: ModalFieldConfig) => <FormControl key={field.name} fullWidth>
            <InputLabel>{field.label}</InputLabel>
            <Select
                label={field.label}
                name={field.name}
                value={formData[field.name as keyof TestType] as string | number}
                onChange={(event) => handleSelecthange(field.name, event.target.value)}
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
            <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
                Example
            </Typography>
            <DataTablePage<TestType>
                dataType={test}
                fetchApi={useTest}
                customRenderers={customRenderers}
                onEdit={onEdit}
                ref={tableRef}
            />
            <ModalTool
                open={open}
                setOpen={setOpen}
                title={`${titleMode}`}
                formData={formData}
                setFormData={setFormData}
                onSubmit={(event) => {
                    event.preventDefault();
                    console.log(formData);
                    // tableRef.current?.getData();
                }}
                fields={modelFields}
                customField={customField}
            />
        </>
    );
};

export default Example;