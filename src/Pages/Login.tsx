import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { useAtom } from "jotai";
import { loginInfoAtom } from "../states/global";
import { IconButton, InputAdornment } from '@mui/material';
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useAuthLogin } from '../utils/fetchUrls';
import { LoginInfoType } from '../types/System/Auth/auth';

interface inputType {
    username: boolean,
    password: boolean,
    [key: string]: boolean
}

export default function Login() {
    const navigate = useNavigate();
    const [, setLoginInfo] = useAtom(loginInfoAtom);
    const authLoginApi = useAuthLogin();

    const [helperText, setHelperText] = useState({
        username: '',
        password: ''
    })
    const [inputError, setInputError] = useState<inputType>({
        username: false,
        password: false
    })
    const [remember, setRemember] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    useEffect(() => {
        const save = localStorage.getItem('save');
        if (save == "true") {
            const username = localStorage.getItem('username');
            // const password = localStorage.getItem('password');
            if (username) setFormData({ username, password: '' });
            setRemember(true)
        }
    }, [])


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { username, password } = formData
        // 信箱格式檢查
        if (username == "") {
            formatErrHandle("username", "請輸入使用者")
            return
        }
        // else {
        //     const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{1,5})+$/;
        //     if (email && !reg.test(email.toString())) {
        //         formatErrHandle("email", "信箱格式錯誤")
        //         return
        //     }
        // }

        if (password == "") {
            formatErrHandle("password", "請輸入密碼")
            return
        }

        const body = {
            username,
            password
        }
        const res = await authLoginApi.post(body);
        if (res.success) {
            setLoginInfo(res.data as LoginInfoType)
            localStorage.setItem('loginInfo', JSON.stringify(res.data));


            if (remember) {
                localStorage.setItem('save', "true");
                localStorage.setItem('username', username);
                // localStorage.setItem('password', password);
            }
            navigate("/");
        } else {
            localStorage.setItem('save', "false");
        }
    };

    const resetHandle = (target: string, e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(pre => ({ ...pre, [target]: e.target.value }))
        if (inputError[target] == false) return;
        setHelperText(pre => ({ ...pre, [target]: "" }))
        setInputError(pre => ({ ...pre, [target]: false }))
    }

    const formatErrHandle = (target: string, msg: string) => {
        setHelperText(pre => ({ ...pre, [target]: msg }))
        setInputError(pre => ({ ...pre, [target]: true }))
    }

    const saveToggle = () => {
        setRemember(!remember)
    }

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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <img src="/src/assets/logo.png" alt="" />
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User Name"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        error={inputError.username}
                        helperText={helperText.username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => resetHandle("username", e)}
                        value={formData.username}
                        sx={{
                            '& input:-webkit-autofill': {
                                WebkitBoxShadow: '0 0 0 1000px white inset',
                                WebkitTextFillColor: '#000',
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        error={inputError.password}
                        helperText={helperText.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => resetHandle("password", e)}
                        value={formData.password}
                        slotProps={
                            {
                                input: {
                                    endAdornment: (
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
                                        </InputAdornment>
                                    )
                                }
                            }
                        }
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                        onChange={saveToggle}
                        checked={remember}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}