import { Button, Divider, Modal } from 'antd'
import React from 'react'
import { FormProvider } from 'react-hook-form'

const RingTestTimerModal=({closeTestModal,show,currentTime,methods})=> {
  return (
    <Modal
    title={<div className="alarm-modal-title">Timer Modal</div>}
    open={show}
    footer={null}
>
    <Divider/>
    <FormProvider {...methods}>
        <form>
            <div style={{ padding: "0 10px", marginBottom: "1em" }}>
                <label htmlFor="title">
                    {currentTime?.title}
                </label>
            </div>
            <Divider />
            <Button type="default" onClick={closeTestModal}>
                OK
            </Button>
        </form>
    </FormProvider>
</Modal>
  )
}

export default RingTestTimerModal