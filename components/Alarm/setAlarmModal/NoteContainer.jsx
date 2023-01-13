import React from 'react';
import styles from "../../../styles/Alarm.module.css";
import { Controller } from 'react-hook-form';
import i18n from '../../../i18n';

const NoteContainer = ({ methods }) => {

    const { control } = methods;

    return (
        <div>
            <span className={styles.inputTitle}>{i18n.t('alarm_note')}</span>
            <Controller
                control={control}
                name="alarmNote"
                render={({ field: { onChange, value } }) => (
                    <textarea
                        id="alarm-note"
                        className="form-control"
                        placeholder={i18n.t('enter_alarm_note')}
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