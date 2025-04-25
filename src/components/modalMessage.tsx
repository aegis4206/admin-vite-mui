import { Box, Button, Modal, Typography } from '@mui/material'
import { modalMessageAtom } from '../states/modal'
import { useAtom } from 'jotai'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
};

const ModalMessage = () => {
    const [modalMessage, setModalMessage] = useAtom(modalMessageAtom)


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        modalMessage?.onSubmit(event);
    };

    const handleModalShow = (open: boolean) => {
        setModalMessage((pre) => pre ? { ...pre, open } : undefined)
    }

    if (!modalMessage) return <></>;

    return (
        <Modal
            open={modalMessage.open}
            // onClose={() => handleModalShow(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
        >
            <Box sx={style} component="form" onSubmit={handleSubmit}
                id='modal-form'  >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {modalMessage.title}
                </Typography>
                {modalMessage.children}
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
                    <Button variant="contained" color='secondary' onClick={() => handleModalShow(false)}>
                        取消
                    </Button>
                </Box>
            </Box>
        </Modal >
    )
}

export default ModalMessage