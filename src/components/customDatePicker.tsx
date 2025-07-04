import { useMemo } from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTranslation } from 'react-i18next';
import { Dayjs } from 'dayjs';

const CustomDatePicker = (props: DatePickerProps<Dayjs>) => {
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
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={i18n.language === 'zh' ? 'zh-tw' : 'en'}
            localeText={localeText}
        >
            <DatePicker {...props} />
        </LocalizationProvider>
    );
};

export default CustomDatePicker;
