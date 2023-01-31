import React, {useEffect} from "react";
import styles from "../../../styles/Timer.module.css";
import {Form} from "react-bootstrap";
import {Controller} from "react-hook-form";

const MinuteContainer = ({ methods }) => {

    const { control } = methods;

    useEffect(() => {
        methods.setValue('minute', 0);
    }, []);

    return (
        <div className={styles.container}>
            <Form.Label className={styles.inputLabel}>Minutes</Form.Label>
            <Controller
                name='minute'
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Form.Control
                        type="number"
                        value={value ?? 0}
                        min={0}
                        onChange={onChange}
                    />
                )}
            />
        </div>
    );
};

export default MinuteContainer;