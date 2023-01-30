import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import DateTimeContainer from "./DateTimeContainer";
import DateTimerModalButton from "./DateTimerModalButton";
import DateTimerSound from "./DateTimerSound";
import DateTimerTitleContainer from "./DateTimeTitle";
import { v4 as uuidv4 } from "uuid";

function DateTimer({ TimerModalClose, FalgSet, getDateTimer,flag}) {
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
        <DateTimeContainer methods={methods} />
        <DateTimerSound methods={methods} />
        <DateTimerTitleContainer methods={methods} />
        <DateTimerModalButton methods={methods} />
      </form>
    </FormProvider>
  );
}

export default DateTimer;
