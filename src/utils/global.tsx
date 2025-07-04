import { styled, TextField } from "@mui/material";

export const CustomDisabledTextField = styled(TextField)(() => ({
    '& .MuiInputBase-root.Mui-disabled': {
        backgroundColor: 'transparent',
    },
    '& .MuiInputBase-input.Mui-disabled': {
        WebkitTextFillColor: '#333',
    },
}));