import React from 'react';
import {Form} from 'react-bootstrap';
import {Controller} from 'react-hook-form';
import styles from "../../../styles/Timer.module.css";

function DateTimeContainer({methods}) {
    const {control} = methods;
    return (
        <div className={styles.container}>
            <Form.Label className={styles.inputLabel}>Date & Time</Form.Label>
            <Controller
                name='dateTime'
                control={control}
                render={({field: {onChange, value}}) => (
                    <Form.Control
                        type={'datetime-local'}
                        id='datetime'
                        onChange={onChange}
                        value={value ?? new Date()}
                    />
                )}
            />
        </div>
    )
}

export default DateTimeContainer