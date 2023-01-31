import {Divider} from "antd";
import React, {useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";
import CountDownOnZero from "./CountDownOnZero";
import TimerModalButton from "./TimerModalButton";
import TimerSound from "./TimerSound";
import TimerTitleContainer from "./TimerTitle";
import {v4 as uuidv4} from "uuid";
import styles from "../../../styles/Timer.module.css";
import HourContainer from "./HourContainer";
import MinuteContainer from "./MinuteContainer";
import SecondContainer from "./SecondContainer";

const CountdownTimer = ({
    isEdit,
    onTest,
    TimerModalClose,
    handleEditAlarm,
    getTimers,
    FalgSet
}) => {

    const methods = useForm();

    const resetForm = () => {
        methods.setValue("hour", 0);
        methods.setValue("minute", 0);
        methods.setValue("second", 0);
        methods.setValue("title", "");
        methods.setValue("sound", "selected");
        methods.setValue("onzero", "stoptimer");
    };


    const handleFormSubmit = (formData) => {
        console.log(formData);
        debugger
        let data = JSON.parse(localStorage.getItem('timer')) || [];
        let startDate = new Date();
        let stopTime = new Date();
        if (isEdit) {
            handleEditAlarm();
        } else {
            const setTimer = {
                timerId: uuidv4(),
                timeoutId: "",
                startDate: startDate,
                stopTime: "",
                hour: formData?.hour,
                minute: formData?.minute,
                second: formData?.second,
                sound: formData?.sound,
                title: formData?.title,
                onzero: formData?.onzero,
                volume: formData?.volume,
                // flag:true
            };
            data.push(setTimer);

            localStorage.setItem("timer", JSON.stringify(data));
            FalgSet();
            TimerModalClose();
            getTimers();
            resetForm();
        }
    };


    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <HourContainer methods={methods}/>
                    </div>
                    <div className={styles.col}>
                        <MinuteContainer methods={methods}/>
                    </div>
                    <div className={styles.col}>
                        <SecondContainer methods={methods}/>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <CountDownOnZero methods={methods} />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <TimerSound methods={methods} isEdit={isEdit}/>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <TimerTitleContainer methods={methods} isEdit={isEdit}/>
                    </div>
                </div>
                <Divider/>
                <TimerModalButton methods={methods} isEdit={isEdit} onTest={onTest}/>
            </form>
        </FormProvider>
    );
};

export default CountdownTimer;
