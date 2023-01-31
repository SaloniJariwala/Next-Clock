import React, {useEffect} from "react";
import styles from "../../../styles/Timer.module.css";
import {Form} from "react-bootstrap";
import {Controller} from "react-hook-form";

const HourContainer = ({ methods }) => {

    const { control } = methods;

    useEffect(() => {
        methods.setValue('hour', 0);
    }, []);

    return (
        <div className={styles.container}>
            <Form.Label className={styles.inputLabel}>Hours</Form.Label>
            <Controller
                name='hour'
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Form.Control
                        type="number"
                        min={0}
                        value={value ?? 0}
                        onChange={onChange}
                    />
                )}
            />
        </div>
    );
};

export default HourContainer;