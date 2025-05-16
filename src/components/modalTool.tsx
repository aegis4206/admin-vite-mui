import { Box, Button, Grid2, Modal, Typography } from '@mui/material'
import { ReactNode, useRef } from 'react'
import { ModalFieldConfig } from '../types/modal';

import FieldTool from './fieldTool';
// import { modalShow } from '../states/modal'
// import { useAtom } from 'jotai'
const style = {
    position: 'absolute',
    top: '2.5vh',
    left: '10%',
    // transform: 'translate(-50%, -50%)',
    width: '80vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    maxHeight: "95vh",
    overflowY: 'auto',
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
        [key: string]: (fields: ModalFieldConfig, errors: Record<string, string>) => ReactNode;
    };
}

const ModalTool = <T,>({ open, setOpen, children, title, onSubmit, fields = [], formData, setFormData, customField = {} }: ModalToolProps<T>) => {
    // const [open, setOpen] = useState<boolean>(false)
    const fieldToolRef = useRef<{ validation: () => boolean }>(null);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // console.log(formData)
        if (!fieldToolRef.current?.validation()) return;

        onSubmit(event);
    };


    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={handleSubmit}
                id='modal-form'  >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Grid2
                    container spacing={2}
                >
                    {formData && setFormData &&
                        <FieldTool<T>
                            fields={fields}
                            fieldsData={formData}
                            setFieldsData={setFormData}
                            customField={customField}
                            ref={fieldToolRef}
                        />
                    }

                    {children}
                </Grid2>
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