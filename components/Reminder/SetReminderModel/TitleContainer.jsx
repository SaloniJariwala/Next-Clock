import React from 'react';
import i18n from '../../../i18n';
import { Controller } from 'react-hook-form';
import styles from "../../../styles/Reminder.module.css";

const TitleContainer = ({ methods }) => {
    
    const { control } = methods;

    return (
        <div>
            <span className={styles.inputTitle}>{i18n.t('reminder_title')}</span>
            <Controller
                control={control}
                name="reminderTitle"
                render={({ field: { onChange, value } }) => (
                    <input
                        id="alarm-title"
                        className="form-control"
                        placeholder={i18n.t('enter_reminder_title')}
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