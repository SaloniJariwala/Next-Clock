import React, { useEffect, useState } from 'react'
import { Divider, Modal, Button } from "antd";
import { FormProvider } from "react-hook-form";

function DisplayTimerModal({timerModal,handleCloseRing,methods,timerId}) {
    const [timerValue,setTimerValue]=useState("")
    useEffect(()=>{
        const timer = JSON.parse(localStorage.getItem("timer")) || [];
        timer.forEach((item)=>{
          if(item.timerId===timerId){
           setTimerValue(item.title)
          }
        })
    },[timerValue])
  return (
    <Modal
            title={<div className="alarm-modal-title">Timer Modal</div>}
            open={timerModal}
            footer={null}
        >
            <Divider />
            <FormProvider {...methods}>
                <form>
                    <div style={{ padding: "0 10px", marginBottom: "1em" }}>
                        <label htmlFor="title">
                            {timerValue?timerValue:"Test Title"}
                        </label>
                    </div>
                    <Divider />
                    <Button type="default" onClick={handleCloseRing}>
                        OK
                    </Button>
                </form>
            </FormProvider>
        </Modal>
  )
}

export default DisplayTimerModal