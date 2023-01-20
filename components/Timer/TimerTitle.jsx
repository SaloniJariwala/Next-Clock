import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Controller } from 'react-hook-form';
import styles from "../../styles/Timer.module.css";

const TimerTitleContainer = ({ methods }) => {

    const { t } = useTranslation();
    const { control } = methods;

    return (
        <div>
            <span className={styles.timer_inputTitle}>Title</span>
            <Controller
                control={control}
                name="title"
                render={({ field: { onChange, value } }) => (
                    <input
                        id="title"
                        className="form-control"
                        placeholder="Enter Timer Title"
                        value={value || ''}
                        onChange={onChange}
                        style={{ color: '#112466' }}
                    />
                )}
            />
        </div>
    )
}

export default TimerTitleContainer;