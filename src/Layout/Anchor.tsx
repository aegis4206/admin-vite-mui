import { useState } from 'react';
import { loginInfoAtom } from '../states/global';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';
import { LuLogOut } from 'react-icons/lu';
import { FaUserEdit } from "react-icons/fa";
import ModalTool from '../components/modalTool';
import { ModalFieldConfig } from '../types/modal';
import { UserType } from '../types/System/Auth/auth';
import { useAuthUpdateMe } from '../utils/fetchUrls';

const fields: ModalFieldConfig[] = [
    { name: "username", label: "使用者名稱", type: "text", validation: ["isEmpty"], disabled: true },
    { name: "password", label: "重設密碼", type: "password" },
    { name: "name", label: "使用者全名", type: "text", validation: ["isEmpty"] },
    { name: "nickname", label: "使用者暱稱", type: "text" },
    // { name: "avatar", label: "使用者頭像", type: "text" },
    { name: "email", label: "使用者信箱", type: "text" },
    { name: "phone", label: "使用者手機號碼", type: "text" },
];
const initData: UserType = {
    id: "",
    username: "",
    password: "",
    name: "",
    nickname: "",
    // avatar: "",
    email: "",
    phone: "",
}

const Anchor = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openE1 = Boolean(anchorEl);
    const [loginInfo,] = useAtom(loginInfoAtom);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [formData, setFormData] = useState(initData);
    const [modalFields,] = useState(fields);
    const api = useAuthUpdateMe()

    // anchorEl
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.removeItem('loginInfo');
        setAnchorEl(null);
        navigate('/login');
    }

    const onProfileEdit = () => {
        setAnchorEl(null);
        if (loginInfo) {
            setFormData({
                ...formData,
                id: loginInfo.user.id,
                username: loginInfo.user.username || "",
                name: loginInfo.user.name || "",
                nickname: loginInfo.user.nickname || "",
                email: loginInfo.user.email || "",
                phone: loginInfo.user.phone || "",
                password: ""
            });
            setOpenModal(true);
        }
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = await api.put(formData);
        if (result.success) {
            setOpenModal(false);
        }
    };

    return (
        <>
            <IconButton
                color="inherit"
                onClick={handleClick}
                aria-controls={openE1 ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openE1 ? 'true' : undefined}
            >
                <FaUserCircle />
            </IconButton>
            {loginInfo && <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openE1}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            minWidth: 200,
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar /> {loginInfo.user.username} {loginInfo.user.name}
                </MenuItem>
                <MenuItem>
                    使用者身份 : {loginInfo.user.type === "0" ? '員工' : '代送商'}
                </MenuItem>
                <MenuItem onClick={onProfileEdit} color='warning'>
                    <ListItemIcon>
                        <FaUserEdit fontSize="small" />
                    </ListItemIcon>
                    編輯個人資料
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LuLogOut fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>}
            <ModalTool
                open={openModal}
                setOpen={setOpenModal}
                title="編輯個人資料"
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                fields={modalFields}
            />
        </>
    )
}

export default Anchor