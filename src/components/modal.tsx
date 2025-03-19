import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { ModalFieldConfig } from '../types/modal';
import { isPositiveInteger } from '../utils/validate';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
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
    maxHeight: "95vh",
    overflowY: "auto",
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
    const errorsInit = useMemo(() => {
        return fields.reduce((acc, field) => {
            acc[field.name as string] = "";
            return acc;
        }, {} as Record<string, string>)
    }, [fields])
    const [errors, setErrors] = useState<Record<string, string>>(errorsInit);



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submit");
        if (!validation()) return;

        onSubmit(event);
    };

    const handleFormChange = (name: keyof T, value: unknown) => {
        if (!setFormData) return;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validation = (): boolean => {
        if (!formData) {
            setErrors(errorsInit);
            return false;
        }
        const err = fields.reduce((acc, field) => {
            if (field.validation) {
                for (const validation of field.validation) {
                    switch (validation) {
                        case "isEmpty":
                            if (formData[field.name as keyof T] === "") {
                                acc[field.name as string] = "此欄位不可為空";
                                return acc;
                            }
                            break;
                        case "isPositiveInteger":
                            if (!isPositiveInteger(formData[field.name as keyof T])) {
                                acc[field.name as string] = "此欄位需為正整數";
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
            return acc;
        }, {} as Record<string, string>)
        setErrors(err);
        return Object.keys(err).length === 0;
    }

    useEffect(() => {
        // reset
        setErrors(errorsInit);
        return () => {
        }
    }, [formData, errorsInit])


    // password設定
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={handleSubmit}
                id='modal-form' >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        sm: `repeat(${Object.keys(fields).length > 12 ? 3 : 2}, 1fr)`
                    },
                    gap: 2, // 欄位間距
                    mt: 2, // 上方間距
                }}>
                    {fields.map((field) => {
                        switch (field.type) {
                            case "text":
                            case "number":
                            case "password":
                                return (
                                    <TextField
                                        key={field.name}
                                        label={field.label}
                                        name={field.name}
                                        type={field.type === 'password' ? showPassword ? 'text' : 'password' : field.type}
                                        value={formData && formData[field.name as keyof T] as string | number}
                                        onChange={(event) => handleFormChange(field.name as keyof T, event.target.value)}
                                        fullWidth
                                        disabled={field.disabled}
                                        error={!!errors[field.name as string]}
                                        helperText={errors[field.name as string]}
                                        sx={{
                                            '& input:-webkit-autofill': {
                                                WebkitBoxShadow: '0 0 0 1000px white inset',
                                                WebkitTextFillColor: '#000',
                                            },
                                        }}
                                        slotProps={
                                            {
                                                input: {
                                                    endAdornment: (
                                                        field.type === "password" ?
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label={
                                                                        showPassword ? 'hide the password' : 'display the password'
                                                                    }
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                    onMouseUp={handleMouseUpPassword}
                                                                    edge="end"
                                                                >
                                                                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                                                </IconButton>
                                                            </InputAdornment> : undefined
                                                    )
                                                },
                                            }
                                        }
                                    />
                                );
                            case "select":
                                return (
                                    <FormControl key={field.name} fullWidth >
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
                            case "date":
                                return (
                                    <LocalizationProvider key={field.name} dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker
                                                defaultValue={dayjs(formData && formData[field.name as keyof T] as string)}
                                                label={field.label}
                                                value={formData && dayjs(formData[field.name as keyof T] as string)}
                                                onChange={(newValue) => handleFormChange(field.name as keyof T, dayjs(newValue).format('YYYY-MM-DD'))}
                                                format='YYYY-MM-DD'
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                );
                            default:
                                if (customField[field.name as string]) {
                                    return customField[field.name as string] && customField[field.name as string](field);
                                }
                                return null;
                        }
                    })}
                    {children}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        mt: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        type="submit"
                        color="info"
                    >
                        確定
                    </Button>
                    <Button variant="contained" color='secondary' onClick={() => setOpen(false)}>
                        取消
                    </Button>
                </Box>
            </Box>
        </Modal >
    )
}

export default ModalTool