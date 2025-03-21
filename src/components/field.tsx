import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { ReactNode, useMemo, useState } from 'react'
import { ModalFieldConfig } from '../types/modal';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import 'dayjs/locale/zh-tw';


interface FieldToolProps<T> {
    fields: ModalFieldConfig[];
    fieldsData: T;
    setFieldsData: React.Dispatch<React.SetStateAction<T>>;
    errors?: Record<string, string>;
    customField?: {
        [key: string]: (fields: ModalFieldConfig) => ReactNode;
    };
}

const FieldTool = <T,>({ fields = [], fieldsData, setFieldsData, errors = {}, customField = {} }: FieldToolProps<T>) => {


    const handleFieldChange = (name: keyof T, value: unknown) => {
        if (!setFieldsData) return;
        setFieldsData((prev) => ({
            ...prev,
            [name]: value === "Invalid Date" ? "" : value,
        }));
    };

    // password設定
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const { t, i18n } = useTranslation();
    const localeText = useMemo(() => ({
        dateFormat: t("datePicker.dateFormat"),
        previousMonth: t("datePicker.previousMonth"),
        nextMonth: t("datePicker.nextMonth"),
        cancelButtonLabel: t("datePicker.cancelButtonLabel"),
        clearButtonLabel: t("datePicker.clearButtonLabel"),
        okButtonLabel: t("datePicker.okButtonLabel"),
        todayButtonLabel: t("datePicker.todayButtonLabel"),
        fieldYearPlaceholder: () => t("datePicker.fieldYearPlaceholder"),
        fieldMonthPlaceholder: () => t("datePicker.fieldMonthPlaceholder"),
        fieldDayPlaceholder: () => t("datePicker.fieldDayPlaceholder"),
    }), [t, i18n.language]);


    return (
        <>
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
                                value={fieldsData[field.name as keyof T] as string | number}
                                onChange={(event) => handleFieldChange(field.name as keyof T, event.target.value)}
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
                                    value={fieldsData[field.name as keyof T] as string | number}
                                    onChange={(event) => handleFieldChange(field.name as keyof T, event.target.value)}
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
                            <LocalizationProvider
                                localeText={localeText}
                                adapterLocale={i18n.language==='zh' ? 'zh-tw' : 'en'}
                                key={field.name}
                                dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    // defaultValue={dayjs(fieldsData[field.name as keyof T] as string)}
                                    label={field.label}
                                    value={dayjs(fieldsData[field.name as keyof T] as string).isValid() ? dayjs(fieldsData[field.name as keyof T] as string) : null}
                                    onChange={(newValue) => handleFieldChange(field.name as keyof T, dayjs(newValue).format('YYYY-MM-DD'))}
                                    format='YYYY-MM-DD'
                                    slotProps={{
                                        field: { clearable: true },
                                        actionBar: { actions: ["clear", "today", "cancel", "accept"] }
                                    }}
                                />
                            </LocalizationProvider>
                        );
                    default:
                        if (customField[field.name as string]) {
                            return customField[field.name as string] && customField[field.name as string](field);
                        }
                        return null;
                }
            })}

        </>
    )
}

export default FieldTool