import React, { useEffect, useState } from 'react';
import { Checkbox, Switch } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import styles from "../../../styles/Alarm.module.css";
import { Controller } from 'react-hook-form';

const options = [
    {
        label: "M",
        value: "Monday"
    },
    {
        label: "T",
        value: "Tuesday"
    },
    {
        label: "W",
        value: "Wednesday"
    },
    {
        label: "T",
        value: "Thursday"
    },
    {
        label: "F",
        value: "Friday"
    },
    {
        label: "S",
        value: "Saturday"
    },
    {
        label: "S",
        value: "Sunday"
    }
];

const RepeatContainer = ({ methods, closeRepeat, isEdit }) => {

    const { t } = useTranslation();
    const { control } = methods;

    const [isRepeat, setIsRepeat] = useState(false);

    const handleSwitchChange = (checked) => {
        methods.setValue('isRepeat', checked);
        setIsRepeat(!isRepeat);
    }

    useEffect(() => {
        if (closeRepeat && !isEdit) {
            setIsRepeat(false);
            methods.setValue('isRepeat', false);
        }
    }, [closeRepeat]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <span className={styles.inputTitle} style={{ marginRight: 10 }}>{t('common:repeat')}</span>{' '}
                <Controller
                    control={control}
                    name="isRepeat"
                    render={({ field: { value } }) => (
                        <Switch
                            size='small'
                            onChange={handleSwitchChange}
                            checked={value}
                        />
                    )}
                />
            </div>
            {isRepeat && (
                <Controller
                    control={control}
                    name="repeatDays"
                    render={({ field: { onChange, value } }) => (
                        <Checkbox.Group
                            options={options}
                            // defaultValue={['Apple']}
                            onChange={onChange}
                            value={value}
                            className={styles.antCheckboxWrapper}
                            style={{ color: '#112466' }}
                        />
                    )}
                />
            )}
        </div>
    )
}

export default RepeatContainer;