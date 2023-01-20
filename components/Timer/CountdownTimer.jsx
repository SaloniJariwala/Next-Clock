import { Divider } from "antd";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CountDownOnZero from "./CountDownOnZero";
import TimeContainer from "./TimeContainer";
import TimerModalButton from "./TimerModalButton";
import TimerSound from "./TimerSound";
import TimerTitleContainer from "./TimerTitle";
import { v4 as uuidv4 } from "uuid";

const CountdownTimer = ({
  sound,
  onZero,
  isEdit,
  onTest,
  TimerModalClose,
  handleEditAlarm,
  getTimers,
  FalgSet,
  flag,
  isInaterval,
}) => {
  const methods = useForm();
  const { control } = methods;
  
  const resetForm = () => {
    methods.setValue("hour", 0);
    methods.setValue("minute", 0);
    methods.setValue("second", 0);
    methods.setValue("title", "");
    methods.setValue("sound", "selected");
    methods.setValue("onzero", "stoptimer");
  };


  const handleFormSubmit = (formData) => {
    let data=JSON.parse(localStorage.getItem('timer'))||[];
    if(isEdit){
      handleEditAlarm();
    }else{
      const setTimer = {
        timerId:uuidv4(),
        timeoutId:"",
        hour: formData?.hour,
        minute: formData?.minute ,
        second: formData?.second ,
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
        <TimeContainer methods={methods} isEdit={isEdit} />
        <CountDownOnZero methods={methods} onZero={onZero} isEdit={isEdit} />
        <TimerSound methods={methods} sound={sound} isEdit={isEdit} />
        <TimerTitleContainer methods={methods} isEdit={isEdit} />
        <Divider />
        <TimerModalButton methods={methods} isEdit={isEdit} onTest={onTest} />
      </form>
    </FormProvider>
  );
};

export default CountdownTimer;
