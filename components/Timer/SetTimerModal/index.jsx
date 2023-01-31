import React, { useState, useRef, useEffect } from "react";
import { Divider, Modal, Tabs } from "antd";
import CountdownTimer from "./CountdownTimer";
import RingTestTimerModal from "../RingTestTimerModal";
import { audioData } from "../../../data/audios";
import defaultAlarmTune from "../../../Assets/audios/alarm.mp3";
import DateTimer from "../DateTimeTimer";

const SetTimerModal = ({
    showModal,
    TimerModalClose,
    onZero,
    isEdit,
    getTimers,
    setIsResume,
    FalgSet,
    flag,
    handleEditAlarm,
    getDateTimer,
    isInaterval
}) => {

    const [showTestModal, setShowTestModal] = useState(false);
    const [currentTime, setCurrentTime] = useState();
    const [audio, setAudio] = useState(defaultAlarmTune);
    const TestTimerAudioRef = useRef();

    const playAudio = () => {
        TestTimerAudioRef.current?.play();
        TestTimerAudioRef.current.loop = true;
    };
    const pause = () => {
        TestTimerAudioRef.current.pause();
    };

    const closeTestModal = () => {
        pause();
        setShowTestModal(false);
    };

    const onTest = () => {
        const testTimer = {
            title: methods.getValues("title"),
        };
        const audios = audioData.filter(
            (item) => item.audioId === methods.getValues("sound")
        );
        setAudio(audios[0]?.track);
        setCurrentTime(testTimer);
        setShowTestModal(true);
        playAudio();
    };

    useEffect(()=>{},[isInaterval])

    return (
        <>
            <audio src={audio} ref={TestTimerAudioRef} />
            <Modal
                title={<div className="alarm-modal-title">Timer Setting</div>}
                open={showModal}
                footer={null}
                onCancel={TimerModalClose}
            >
                <Divider />
                <Tabs
                    type="card"
                >
                    <Tabs.TabPane tab="Countdown" key="item-1">
                        <CountdownTimer
                            TimerModalClose={TimerModalClose}
                            getTimers={getTimers}
                            setIsResume={setIsResume}
                            FalgSet={FalgSet}
                            onZero={onZero}
                            isEdit={isEdit}
                            onTest={onTest}
                            flag={flag}
                            handleEditAlarm={handleEditAlarm}
                            isInaterval={isInaterval}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Count till (from) date and time" key="item-2">
                        <DateTimer
                            TimerModalClose={TimerModalClose}
                            setIsResume={setIsResume}
                            FalgSet={FalgSet}
                            onZero={onZero}
                            getDateTimer={getDateTimer}
                            flag={flag}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </Modal>
            <audio src={defaultAlarmTune} ref={TestTimerAudioRef} />
            <RingTestTimerModal
                closeTestModal={closeTestModal}
                show={showTestModal}
                currentTime={currentTime}
            />
        </>
    );
};

export default SetTimerModal;
