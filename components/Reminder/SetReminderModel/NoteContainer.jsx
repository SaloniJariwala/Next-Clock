import React from 'react';
import styles from "../../../styles/Reminder.module.css";
import { Controller } from 'react-hook-form';
import i18n from '../../../i18n';

const NoteContainer = ({ methods }) => {

    const { control } = methods;

    return (
        <div>
            <span className={styles.inputTitle}>{i18n.t('reminder_note')}</span>
            <Controller
                control={control}
                name="reminderNote"
                render={({ field: { onChange, value } }) => (
                    <textarea
                        className="form-control"
                        placeholder={i18n.t('enter_reminder_note')}
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