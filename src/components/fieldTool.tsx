import { Autocomplete, Divider, Grid2, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material'
import { Fragment, ReactNode, RefObject, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { ModalFieldConfig } from '../types/modal';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import 'dayjs/locale/zh-tw';
import { isPositiveInteger } from '../utils/validate';
import { CityList } from '../utils/cityList';

interface FieldToolProps<T> {
    fields: ModalFieldConfig[];
    fieldsData: T;
    setFieldsData: React.Dispatch<React.SetStateAction<T>>;
    customField?: {
        [key: string]: (fields: ModalFieldConfig, errors: Record<string, string>) => ReactNode;
    };
    ref?: RefObject<{ validation: () => boolean } | null>;
}



const FieldTool = <T,>({ fields = [], fieldsData, setFieldsData, customField = {}, ref }: FieldToolProps<T>) => {
    const errorsInit = useMemo(() => {
        return fields.reduce((acc, field) => {
            acc[field.name as string] = "";
            return acc;
        }, {} as Record<string, string>)
    }, [])
    const [errors, setErrors] = useState<Record<string, string>>(errorsInit);

    const handleFieldChange = (field: ModalFieldConfig, value: number | string) => {
        if (!setFieldsData) return;
        setFieldsData((prev) => {
            const tempFields = { ...prev }

            // 將select的id option label塞入name
            if (field.type === "select" && typeof field.name === "string" && field.name.endsWith("Id")) {
                const fieldName = (field.name as string).replace("Id", "Name")
                return ({
                    ...tempFields,
                    [fieldName]: field.options?.find(option => option.value === value)?.label || "",
                    [field.name]: value,
                })
            }
            return ({
                ...tempFields,
                [field.name]: value === "Invalid Date" ? (field.type === "date" ? "" : value) : value,
            })
        });
    };

    const handleAddressChange = (name: keyof T, value: string) => {
        if (!setFieldsData) return;
        setFieldsData((prev) => {
            const tempFields = { ...prev }
            if (name === "county") {
                return ({
                    ...tempFields,
                    [name]: value,
                    district: "",
                    zipCode: "",
                })
            }
            else if (name === "district") {
                const targetCounty = fieldsData["county" as keyof T] as keyof typeof CityList;
                const targetDistrict = value;
                return ({
                    ...tempFields,
                    [name]: value,
                    zipCode: CityList[targetCounty]?.[targetDistrict as keyof typeof CityList[typeof targetCounty]]
                })
            }
            else {
                return ({
                    ...tempFields,
                    [name]: value,
                })
            }
        });
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

    const validation = (): boolean => {
        if (!fieldsData) {
            setErrors(errorsInit);
            return false;
        }
        const err = fields.reduce((acc, field) => {
            if (field.validation) {
                for (const validation of field.validation) {
                    switch (validation) {
                        case "isEmpty":
                            if (fieldsData[field.name as keyof T] === "") {
                                acc[field.name as string] = "此欄位不可為空";
                                return acc;
                            }
                            break;
                        case "isPositiveInteger":
                            if (!isPositiveInteger(fieldsData[field.name as keyof T])) {
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

    useImperativeHandle(ref, () => ({
        validation,
    }));

    useEffect(() => {
        // reset
        setErrors(errorsInit);
        return () => {
        }
    }, [fieldsData])

    const customTextField = (field: ModalFieldConfig, smGrid: number = 4) => {
        let sm;
        switch (field.name) {
            // 處理紀錄(建立時間、修改時間、新增者、修改者)欄位
            case "createdAt":
            case "updatedAt":
            case "creator":
            case "modifier":
                sm = 3;
                break;

            default:
                sm = smGrid;
                break;
        }


        return (
            <Grid2 size={{ xs: 12, sm }} key={field.name}>
                <TextField
                    label={field.label}
                    name={field.name}
                    type={field.type === 'password' ? showPassword ? 'text' : 'password' : field.type}
                    value={fieldsData[field.name as keyof T] as string | number}
                    onChange={(event) => handleFieldChange(field as ModalFieldConfig, event.target.value)}
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
            </Grid2>)
    }


    return (
        <>
            {fields.map((field) => {
                switch (field.type) {
                    case "text":
                    case "number":
                    case "password":
                        return (
                            <Fragment key={field.name}>
                                {/* 處理分隔線 */}
                                {field.name === "createdAt" && <Grid2 size={{ xs: 12, sm: 12 }}>
                                    <Divider>紀錄</Divider>
                                </Grid2>}
                                {customTextField(field, field.smGrid)}
                            </Fragment>
                        );
                    case "select":
                        return (
                            <Grid2 size={{ xs: 12, sm: 4 }} key={field.name}>
                                {/* <TextField
                                    label={field.label}
                                    name={field.name}
                                    select
                                    fullWidth
                                    value={fieldsData[field.name as keyof T] as string | number}
                                    onChange={(event) => handleFieldChange(field as ModalFieldConfig, event.target.value)}
                                    error={!!errors[field.name as string]}
                                    helperText={errors[field.name as string]}
                                >
                                    {field.options ? field.options.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    )) : <MenuItem value="" disabled>
                                        {field.label}
                                    </MenuItem>}
                                </TextField> */}
                                <Autocomplete
                                    options={field.options || [{ value: '', label: field.label }]}
                                    getOptionLabel={(option) => option.label ?? ''}
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    value={
                                        field.options?.find(opt =>
                                            opt.value === fieldsData[field.name as keyof T]
                                        ) || null
                                    }
                                    onChange={(_, newValue) => {
                                        handleFieldChange(field as ModalFieldConfig, newValue?.value ?? '');
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={field.label}
                                            name={field.name}
                                            fullWidth
                                            error={!!errors[field.name as string]}
                                            helperText={errors[field.name as string]}
                                        />
                                    )}
                                />
                            </Grid2>
                        );
                    case "date":
                        return (
                            <Grid2 size={{ xs: 12, sm: 4 }} key={field.name}>
                                <LocalizationProvider
                                    localeText={localeText}
                                    adapterLocale={i18n.language === 'zh' ? 'zh-tw' : 'en'}
                                    key={field.name}
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker
                                        sx={{ width: "100%" }}
                                        label={field.label}
                                        value={dayjs(fieldsData[field.name as keyof T] as string).isValid() ? dayjs(fieldsData[field.name as keyof T] as string) : null}
                                        onChange={(newValue) => handleFieldChange(field as ModalFieldConfig, dayjs(newValue).format('YYYY-MM-DD'))}
                                        format='YYYY-MM-DD'
                                        slotProps={{
                                            field: { clearable: true },
                                            actionBar: { actions: ["clear", "today", "cancel", "accept"] },
                                            textField: {
                                                error: !!errors[field.name as string],
                                                helperText: errors[field.name as string],
                                            },
                                            popper: {
                                                placement: 'auto',
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid2>
                        );
                    case "address":
                        if (field.name === 'address') {
                            const targetCounty = fieldsData["county" as keyof T] as keyof typeof CityList;
                            const targetDistrict = fieldsData["district" as keyof T] as string;
                            const validCounty = targetCounty && targetCounty in CityList;
                            return (<Fragment key={field.name}
                            >
                                <Grid2 size={{ xs: 12, sm: 12 }}>
                                    <Divider>地址</Divider>
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 2 }}>
                                    <TextField
                                        disabled
                                        label="區碼"
                                        name="zipCode"
                                        fullWidth
                                        value={CityList[targetCounty]?.[targetDistrict as keyof typeof CityList[typeof targetCounty]] || (fieldsData["zipCode" as keyof T] ?? "")}
                                    >
                                    </TextField>
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 2 }}>
                                    <TextField
                                        label="縣市"
                                        name="county"
                                        fullWidth
                                        select
                                        value={(fieldsData["county" as keyof T] ?? "")}
                                        onChange={(event) => handleAddressChange("county" as keyof T, event.target.value)}
                                        error={!!errors["county"]}
                                        helperText={errors["county"]}
                                    >
                                        {Object.keys(CityList).map((county) => (
                                            <MenuItem key={county} value={county}>
                                                {county}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 2 }}>
                                    <TextField
                                        label="鄉鎮區"
                                        name="district"
                                        fullWidth
                                        select
                                        value={fieldsData["district" as keyof T] ?? ""}
                                        onChange={(event) => handleAddressChange("district" as keyof T, event.target.value)}
                                        error={!!errors["district"]}
                                        helperText={errors["district"]}
                                    >
                                        {validCounty ? Object.keys(CityList[targetCounty]).map((district) => (
                                            <MenuItem key={district} value={district}>
                                                {district}
                                            </MenuItem>
                                        )) : (
                                            <MenuItem value="" disabled>
                                                請先選擇縣市
                                            </MenuItem>
                                        )}
                                    </TextField>
                                </Grid2>
                                {/* address欄位 */}
                                {customTextField(field, 6)}
                            </Fragment >);
                        }
                        break;
                    case "divider":
                        return (
                            <Grid2 size={{ xs: 12, sm: 12 }} key={field.name}>
                                <Divider>{field.label}</Divider>
                            </Grid2>
                        );
                    default:
                        if (customField[field.name as string]) {
                            return customField[field.name as string](field, errors);
                        }
                        return null;
                }
            })}

        </>
    )
}

export default FieldTool