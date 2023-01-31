import React, {useEffect} from "react";
import styles from "../../../styles/Timer.module.css";
import {Form} from "react-bootstrap";
import {Controller} from "react-hook-form";

const SecondContainer = ({ methods, isEdit }) => {

    const { control } = methods;

    useEffect(() => {
        methods.setValue('second', 0);
    }, []);

    return (
        <div className={styles.container}>
            <Form.Label className={styles.inputLabel}>Seconds</Form.Label>
            <Controller
                name='second'
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

export default SecondContainer;