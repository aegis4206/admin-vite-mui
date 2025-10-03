import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import {
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    FormControlLabel,
    Checkbox,
    Box,
    FormGroup,
} from "@mui/material";
import { BackEndMenuItem } from "../../../types/menu";
import { AuthRoleType, permissionNameMap } from "../../../types/System/Auth/auth";

const RolePermissionMenuComponent = ({ item, level, formData, setFormData }: {
    item: BackEndMenuItem;
    level: number;
    formData: AuthRoleType;
    setFormData: React.Dispatch<React.SetStateAction<AuthRoleType>>;
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const hasChildren = "children" in item && !!item.children && item.children.length > 0;

    const handlePermissionToggle = (perm: string) => {
        setFormData(prev => {
            const hasPerm = prev.permissions.includes(perm);
            return {
                ...prev,
                permissions: hasPerm
                    ? prev.permissions.filter(p => p !== perm)
                    : [...prev.permissions, perm],
            };
        });
    };

    const handleGroupToggle = () => {
        if (!item.permission) return;
        const allPerms = item.permission.map(perm => `${item.path}.${perm}`);
        const hasAll = allPerms.every(perm => formData.permissions.includes(perm));
        setFormData(prev => {
            return {
                ...prev,
                permissions: hasAll
                    ? prev.permissions.filter(p => !allPerms.includes(p))
                    : [...prev.permissions, ...allPerms],
            };
        });
    };

    const itemsCheck = (target: string) => {
        if (!item.permission) return false;
        const func = (perm: string) => formData.permissions.includes(`${item.path}.${perm}`);
        if (target === 'some') {
            return item.permission.some(func);
        } else if (target === 'all') {
            return item.permission.every(func);
        }

        return false;
    }

    const allItemsCheck = itemsCheck('all');
    const someItemsCheck = itemsCheck('some');

    return (
        <>
            {
                hasChildren ? <ListItemButton
                    sx={{
                        pl: level == 0 ? null : level + 2,
                        maxWidth: "100%",
                        "& .MuiListItemText-root": {
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        },
                    }}
                    onClick={hasChildren ? () => setOpen(!open) : undefined}
                >
                    <ListItemText sx={{ pl: -2, overflow: "hidden" }} primary={item.name} />
                    {hasChildren && (open ? <MdExpandLess /> : <MdExpandMore />)}
                </ListItemButton > : item.permission &&
                (
                    <Box sx={{
                        pl: level == 0 ? null : level + 2,
                        maxWidth: "100%",
                        borderTop: '1px solid #ccc',
                    }} >
                        <FormControlLabel
                            label={item.name}
                            control={
                                <Checkbox
                                    checked={allItemsCheck}
                                    indeterminate={!allItemsCheck && someItemsCheck}
                                    onChange={handleGroupToggle}
                                />
                            }
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #ccc', }}>
                            <FormGroup row sx={{ pl: 4 }}>
                                {
                                    item.permission && item.permission.map((perm: keyof typeof permissionNameMap) => {
                                        const fullPath = `${item.path}.${perm}`;
                                        return (
                                            <FormControlLabel
                                                key={fullPath}
                                                label={permissionNameMap[perm] || perm}
                                                control={
                                                    <Checkbox
                                                        checked={formData.permissions.includes(fullPath)}
                                                        onChange={() => handlePermissionToggle(fullPath)}
                                                    />
                                                }
                                            />
                                        )
                                    }
                                    )
                                }
                            </FormGroup>
                        </Box>
                    </Box>
                )
            }
            {hasChildren && item.children && (
                <Collapse in={open} >
                    <List component="div" disablePadding>
                        {item.children.map((child: BackEndMenuItem, index: number) => (
                            <RolePermissionMenuComponent key={index} item={child} level={level + 2} formData={formData} setFormData={setFormData} />
                        ))}
                    </List>
                </Collapse>
            )
            }
        </>
    );
};

export default RolePermissionMenuComponent;