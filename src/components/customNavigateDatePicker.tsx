import { Box } from '@mui/material';
import { useState } from 'react'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import CustomDatePicker from './customDatePicker';
import dayjs from 'dayjs';

const CustomNavigateDatePicker = () => {
    const today = dayjs().format('YYYY-MM-DD');
    const [pickerDate, setPickerDate] = useState(today);

    const handleDateChange = async (newValue: dayjs.Dayjs | null,) => {
        if (!newValue || !newValue.isValid()) return;
        const date = newValue.format('YYYY-MM-DD');
        setPickerDate(date);
    }

    const onDateButtonClick = (direction: 'prev' | 'next') => {
        const currentDate = dayjs(pickerDate);
        const newDate = direction === 'prev' ? currentDate.subtract(1, 'day') : currentDate.add(1, 'day');
        handleDateChange(newDate);
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <MdNavigateBefore
                className='hover:cursor-pointer mr-2'
                size={40}
                onClick={() => {
                    onDateButtonClick('prev');
                }}
            />
            <CustomDatePicker
                label="日期"
                value={dayjs(pickerDate)}
                onChange={handleDateChange}
                format='YYYY-MM-DD'
                slotProps={{
                    actionBar: { actions: ["today", "cancel", "accept"] },
                    popper: {
                        placement: 'auto',
                    },
                    textField: {
                        variant: 'standard',
                        fullWidth: true,
                        inputProps: {
                            readOnly: true,
                        },
                    }
                }}
            />
            <MdNavigateNext
                className='hover:cursor-pointer ml-2'
                size={40}
                onClick={() => {
                    onDateButtonClick('next');
                }}
            />
        </Box>
    )
}

export default CustomNavigateDatePicker