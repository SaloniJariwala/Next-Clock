import React, { useEffect } from "react";
import { Radio } from "antd";
import { Controller } from "react-hook-form";
import styles from "../../../styles/Timer.module.css";
import { Form } from 'react-bootstrap';

const CountDownOnZero = ({ methods }) => {

    const { control } = methods;

    useEffect(() => {
        methods.setValue("onzero","stoptimer")
    },[]);

    return (
            <div className={styles.container}>
                <Form.Label className={styles.inputLabel}>On Zero</Form.Label>
                    <Controller
                        control={control}
                        name="onzero"
                        render={({ field: { onChange,value } }) => (
                            <Radio.Group
                                name="radiogroup"
                                onChange={onChange}
                                value={value}
                            >
                                <Radio value={"stoptimer"}>Stop Timer</Radio>
                                <Radio value={"restarttimer"}>Restart Timer</Radio>
                            </Radio.Group>
                        )}
                    />
            </div>
    );
};

export default CountDownOnZero;
