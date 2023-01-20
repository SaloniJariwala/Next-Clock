import React, { useEffect } from 'react'
import { Controller } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import styles from "../../styles/Timer.module.css";

function TimeContainer({methods,isEdit}) {
    const { control } = methods;
    useEffect(() => {
        if (!isEdit) {
            methods.setValue('hour', 0);
            methods.setValue('minute', 0);
            methods.setValue('second', 0);
        }
        // eslint-disable-next-line
    }, []);
  return (
   <>
    <div className={styles.count_timer}>
                <div className={styles.timer_set}>
                    <Form.Label className={styles.timer_label}>Hours</Form.Label>
                    <Controller
                        name='hour'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Form.Control
                            className={styles.hour_set}
                                type="number"
                                min={0}
                                max={23}
                                value={value ?? 0}
                                onChange={onChange}
                            />
                        )}
                    />

                </div>
                <div className={styles.timer_set}>
                    <Form.Label className={styles.timer_label}>Minutes</Form.Label>
                    <Controller
                        name='minute'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Form.Control
                            className={styles.hour_set}
                                type="number"
                                value={value ?? 0}
                                min={0}
                                max={59}
                                onChange={onChange}
                            />
                        )}
                    />

                </div>
                <div className={styles.timer_set}>
                    <Form.Label className={styles.timer_label}>Seconds</Form.Label>
                    <Controller
                        name='second'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Form.Control
                            className={styles.hour_set}
                                type="number"
                                value={value ?? 0}
                                min={0}
                                max={59}
                                onChange={onChange}
                            />
                        )}
                    />
                </div>
            </div>
   </>
  )
}

export default TimeContainer