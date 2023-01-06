import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import styles from "../../../styles/Alarm.module.css";
import { Controller } from 'react-hook-form';

const NoteContainer = ({ methods }) => {

    const { t } = useTranslation();
    const { control } = methods;

    return (
        <div>
            <span className={styles.inputTitle}>{t('common:alarm_note')}</span>
            <Controller
                control={control}
                name="alarmNote"
                render={({ field: { onChange, value } }) => (
                    <textarea
                        id="alarm-note"
                        className="form-control"
                        placeholder={t('common:enter_alarm_note')}
                        onChange={onChange}
                        value={value}
                        style={{ color: '#112466' }}
                    ></textarea>
                )}
            />
        </div>
    )
}

export default NoteContainer;