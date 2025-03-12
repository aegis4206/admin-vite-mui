import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { ModalFieldConfig } from '../types/modal';
// import { modalShow } from '../states/modal'
// import { useAtom } from 'jotai'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
};


interface ModalToolProps<T> {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    formData?: T;
    setFormData?: React.Dispatch<React.SetStateAction<T>>;
    children?: ReactNode;
    fields?: ModalFieldConfig[];
    customField?: {
        [key: string]: (fields: ModalFieldConfig) => ReactNode;
    };
}

const ModalTool = <T,>({ open, setOpen, children, title, onSubmit, fields = [], formData, setFormData, customField = {} }: ModalToolProps<T>) => {
    // const [open, setOpen] = useState<boolean>(false)
    // const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submit");
        onSubmit(event);
    };

    const handleFormChange = (name: keyof T, value: unknown) => {
        if (!setFormData) return;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Box component="form" sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)", // 三欄佈局
                    gap: 2, // 欄位間距
                    mt: 4, // 上方間距
                }} onSubmit={handleSubmit}
                    id='modal-form'
                    noValidate>
                    {fields.map((field) => {
                        switch (field.type) {
                            case "text":
                            case "number":
                                return (
                                    <TextField
                                        key={field.name}
                                        label={field.label}
                                        name={field.name}
                                        type={field.type}
                                        value={formData && formData[field.name as keyof T] as string | number}
                                        onChange={(event) => handleFormChange(field.name as keyof T, event.target.value)}
                                        fullWidth
                                        disabled={field.disabled}
                                    // error={!!errors[field.name as string]}
                                    // helperText={errors[field.name as string]}
                                    />
                                );
                            case "select":
                                return (
                                    <FormControl key={field.name} fullWidth>
                                        <InputLabel>{field.label}</InputLabel>
                                        <Select
                                            label={field.label}
                                            name={field.name}
                                            value={formData && formData[field.name as keyof T] as string | number}
                                            onChange={(event) => handleFormChange(field.name as keyof T, event.target.value)}
                                        >
                                            {field.options?.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                );
                            default:
                                if (customField[field.name as string]) {
                                    return customField[field.name as string] && customField[field.name as string](field);
                                }
                                return null;
                        }
                    })}
                    {children}
                    <Box
                        sx={{
                            gridColumn: "span 3", // 佔據所有三欄
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1,
                            mt: 2,
                        }}
                    >
                        <Button
                            variant="outlined"
                            type="submit"
                            color="error"
                        >
                            確定
                        </Button>
                        <Button variant="outlined" onClick={() => setOpen(false)}>
                            取消
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal >
    )
}

export default ModalTool