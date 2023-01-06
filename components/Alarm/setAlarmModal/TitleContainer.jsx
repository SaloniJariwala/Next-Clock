import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Controller } from 'react-hook-form';
import styles from "../../../styles/Alarm.module.css";

const TitleContainer = ({ methods }) => {

    const { t } = useTranslation();
    const { control } = methods;

    return (
        <div>
            <span className={styles.inputTitle}>{t('common:alarm_title')}</span>
            <Controller
                control={control}
                name="alarmTitle"
                render={({ field: { onChange, value } }) => (
                    <input
                        id="alarm-title"
                        className="form-control"
                        placeholder={t('common:enter_alarm_title')}
                        value={value || ''}
                        onChange={onChange}
                        style={{ color: '#112466' }}
                    />
                )}
            />
        </div>
    )
}

export default TitleContainer;