// import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { snackBarAtom } from '../states/global';
import { useAtom } from "jotai";


export default function Snackbars() {
    const [snackBarOptions, setSnackBarOptions] = useAtom(snackBarAtom);


    const handleClose = (
        // event?: React.SyntheticEvent | Event,
        // reason?: SnackbarCloseReason,
    ) => {
        // if (reason === 'clickaway') {
        //   return;
        // }
        setSnackBarOptions({ ...snackBarOptions, open: false });
    };

    return (<>
        {snackBarOptions && <Snackbar open={snackBarOptions.open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={snackBarOptions.severity || "info"}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {snackBarOptions.message || ""}
            </Alert>
        </Snackbar>}
    </>
    );
}