import { Box, Button, Modal, Typography } from '@mui/material'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { ModalFieldConfig } from '../types/modal';
import { isPositiveInteger } from '../utils/validate';

import FieldTool from './field';
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
                        sm: `repeat(${fields.length > 12 ? 3 : 2}, 1fr)`
                    },
                    gap: 2, // 欄位間距
                    mt: 2, // 上方間距
                }}>
                    {formData && setFormData &&
                        <FieldTool<T>
                            fields={fields}
                            fieldsData={formData}
                            setFieldsData={setFormData}
                            errors={errors}
                            customField={customField}
                        />
                    }

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