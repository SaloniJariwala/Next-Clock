import { Radio } from "antd";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import styles from "../../styles/Timer.module.css";

const CountDownOnZero = ({ methods,onZero }) => {

    const { control } = methods;

    useEffect(()=>{
        methods.setValue("onzero","stoptimer")
    },[])
    return (
        <div className={styles.timer_onzero}>
            <div className={styles.timer_text}>
                <p className={styles.text}>On Zero</p>
                <div className={styles.radio_button}>
                    <Controller
                        control={control}
                        name="onzero"
                        render={({ field: { onChange,value } }) => (
                            <Radio.Group name="radiogroup" onChange={onChange} value={value} >
                                <Radio value={"stoptimer"}>Stop Timer</Radio>
                                <Radio value={"restarttimer"}>Restart Timer</Radio>
                            </Radio.Group>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default CountDownOnZero;
