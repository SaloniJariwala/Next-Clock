import React from "react";
import { DatePicker } from "antd";
import { Controller } from "react-hook-form";
import styles from "../../../styles/Reminder.module.css";
import i18n from "../../../i18n";

const TimeContainer = ({ methods }) => {

    const { control } = methods;

    return (
        <div className={styles.container}>
            <span className={styles.inputTitle}>{i18n.t('date_time')}</span>
            <Controller
                name='dateTime'
                control={control}
                render={({ field: { onChange, value} }) => (
                    <DatePicker
                        showTime
                        value={value}
                        onChange={onChange}
                        style={{ color: '#112466', width: '100%', padding: '8px 10px', fontSize: '16px' }}
                    />
                )}
            />
        </div>
    );
};

export default TimeContainer;