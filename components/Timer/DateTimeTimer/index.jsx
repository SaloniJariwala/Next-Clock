import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import DateTimeContainer from "./DateTimeContainer";
import DateTimerModalButton from "./DateTimerModalButton";
import DateTimerTitleContainer from "./DateTimeTitle";
import { v4 as uuidv4 } from "uuid";
import {Divider} from "antd";
import styles from "../../../styles/Timer.module.css";
import TimerSound from "../SetTimerModal/TimerSound";

function DateTimer({ TimerModalClose, FalgSet, getDateTimer }) {
    const methods = useForm();
    let startTime=new Date();
    const resetForm = () => {
        methods.setValue("dateTime", new Date());
        methods.setValue("hour", 0);
        methods.setValue("minute", 0);
        methods.setValue("second", 0);
        methods.setValue("title", "");
        methods.setValue("sound", "selected");
        methods.setValue("onzero", "stoptimer");
    };
    const handleFormSubmit = (data) => {
        const dateTimer=JSON.parse(localStorage.getItem('timer')) ||[];
        const setTimer = {
            timerId:uuidv4(),
            timeoutId:"",
            startDate:startTime,
            stopTime:"",
            dateTime: data?.dateTime || 0,
            sound: data?.sound,
            title: data?.title,
            volume: data?.volume,
            flag:false
        };
        dateTimer.push(setTimer)
        localStorage.setItem("timer", JSON.stringify(dateTimer));
        FalgSet();
        TimerModalClose();
        getDateTimer();
        resetForm();
    };
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <DateTimeContainer methods={methods} />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <TimerSound methods={methods} />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <DateTimerTitleContainer methods={methods} />
                    </div>
                </div>
                <Divider />
                <DateTimerModalButton methods={methods} />
            </form>
        </FormProvider>
    );
}

export default DateTimer;
