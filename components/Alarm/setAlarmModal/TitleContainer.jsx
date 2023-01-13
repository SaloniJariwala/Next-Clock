import React from 'react';
import i18n from '../../../i18n';
import { Controller } from 'react-hook-form';
import styles from "../../../styles/Alarm.module.css";

const TitleContainer = ({ methods }) => {
    
    const { control } = methods;

    return (
        <div>
            <span className={styles.inputTitle}>{i18n.t('alarm_title')}</span>
            <Controller
                control={control}
                name="alarmTitle"
                render={({ field: { onChange, value } }) => (
                    <input
                        id="alarm-title"
                        className="form-control"
                        placeholder={i18n.t('enter_alarm_title')}
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