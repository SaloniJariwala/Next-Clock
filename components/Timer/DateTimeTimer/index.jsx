import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import DateTimeContainer from "./DateTimeContainer";
import DateTimerModalButton from "./DateTimerModalButton";
import DateTimerSound from "./DateTimerSound";
import DateTimerTitleContainer from "./DateTimeTitle";

function DateTimer({ TimerModalClose, FalgSet, getDateTimer,flag}) {
  const methods = useForm();

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
    debugger;
    const setTimer = {
      dateTime: data?.dateTime || 0,
      sound: data?.sound,
      title: data?.title,
      volume: data?.volume,
      flag:false
    };
    debugger
    localStorage.setItem("timer", JSON.stringify(setTimer));
    debugger
    FalgSet();
    debugger
    TimerModalClose();
    debugger
    getDateTimer();
    debugger
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
