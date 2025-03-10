import { Box, Button, Modal, Typography } from '@mui/material'
import React, { ReactNode } from 'react'
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
    borderRadius: "10px"
};

interface ModalToolProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    children: ReactNode;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ModalTool = ({ open, setOpen, children, title, onSubmit }: ModalToolProps) => {
    // const [open, setOpen] = useState<boolean>(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(event);
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {children}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Button sx={{ marginRight: "5px" }} variant='outlined' type="submit" color='error'>確定</Button>
                    <Button variant='outlined' onClick={() => setOpen(false)}>取消</Button>
                </Typography>
            </Box>
        </Modal >
    )
}

export default ModalTool