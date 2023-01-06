import React, { useEffect, useRef, useState } from 'react'
import Clock from '../Clock';
import styles from "../../styles/Alarm.module.css";
import { Divider } from 'antd';
import UpcomingAlarm from './UpcomingAlarm';
import SetAlarmModal from './setAlarmModal';
import useTranslation from 'next-translate/useTranslation';
import { v4 as uuidv4 } from "uuid";
import { notifyUser } from "../../utils/notification";
import RingAlarmModal from './ringAlarmModal';

const Alarm = () => {

    const indexAudioRef = useRef();
    const { t } = useTranslation();

    const [isEdit, setIsEdit] = useState(false);
    const [flag, setFlag] = useState(false);
    const [upcomingAlarms, setUpcomingAlarms] = useState();
    const [showSetAlarm, setShowSetAlarm] = useState(false);
    const [closeRepeat, setCloseRepeat] = useState(false);
    const [currentAlarm, setCurrentAlarm] = useState();
    const [showRingModal, setShowRingModal] = useState(false);
    const [alarmAudio, setAlarmAudio] = useState();
    const [volume, setVolume] = useState(50);

    useEffect(() => {
        const allAlarms = JSON.parse(localStorage.getItem('Alarms')) || [];
        const upcoming = allAlarms.filter(
            (item) => item.alarmTimestamp > Date.now()
        );
        setUpcomingAlarms(upcoming);
    }, [flag]);

    const play = () => {
        indexAudioRef.current?.play();
        indexAudioRef.current.volume = parseFloat(volume / 100);
        indexAudioRef.current.loop = true;
    };

    const pause = () => {
        indexAudioRef.current?.pause();
        setFlag(!flag);
    };

    useEffect(() => {
        indexAudioRef.current.volume = parseFloat(volume / 100);
    }, [volume]);

    const handleSetAlarm = () => {
        setShowSetAlarm(true);
    }

    const handleCloseAlarm = () => {
        setShowSetAlarm(false);
        setCloseRepeat(true);
    }

    const closeRingModal = () => {
        setShowRingModal(false);
    }

    const storeAlarm = (alarmDetails, type = "") => {
        let newAlarm;
        const allAlarms = JSON.parse(localStorage.getItem("Alarms")) || [];
        if (type !== "specific") {
            newAlarm = {
                alarmId: uuidv4(),
                timeoutId: "",
                countryTimestamp: alarmDetails?.countryTime.getTime(),
                alarmTimestamp: alarmDetails?.alarmDate?.getTime(),
                orgTimestamp: alarmDetails?.alarmDate?.getTime(),
                isAlarmPause: false,
                alarmDetails: alarmDetails?.alarmRepeat,
                title: alarmDetails?.alarmTitle,
                note: alarmDetails?.alarmNote,
                country: alarmDetails?.country,
                alarmTune: alarmDetails?.alarmTune,
                alarmVolume: alarmDetails?.alarmVolume,
            };
            const isRepeatAlarm = "isRepeat" in alarmDetails;
            if (isRepeatAlarm) {
                newAlarm = { ...newAlarm, isRepeat: alarmDetails?.isRepeat };
            }
        } else {
            newAlarm = alarmDetails;
        }
        allAlarms.push(newAlarm);
        localStorage.setItem("Alarms", JSON.stringify(allAlarms));
        handleCloseAlarm();
        setFlag(!flag);
    };

    const callToAlarm = () => {
        const allAlarms = JSON.parse(localStorage.getItem("Alarms")) || [];
        const currentTimestamp = Date.now();
        let newList = allAlarms.filter(
            (item) => item.alarmTimestamp > currentTimestamp && !item.isAlarmPause
        );
        let nearestAlarm;
        if (newList.length > 1) {
            for (let i = 0; i < newList.length; i++) {
                for (let j = 0; j <= i; j++) {
                    if (newList[j].alarmTimestamp >= newList[i].alarmTimestamp) {
                        nearestAlarm = newList[j];
                    }
                }
            }
        } else {
            nearestAlarm = newList[0];
        }
        setAlarmAudio(nearestAlarm?.alarmTune);
        setVolume(nearestAlarm?.alarmVolume);
        const currTimestamp = Date.now();
        let diff;
        diff = nearestAlarm?.alarmTimestamp - currTimestamp;
        if (diff >= 0) {
            const id = setTimeout(() => {
                play();
                notifyUser(nearestAlarm.title, nearestAlarm.note);
                setFlag(!flag);
                setCurrentAlarm(nearestAlarm);
                setShowRingModal(true);
            }, diff);
            const allAlarms = JSON.parse(localStorage.getItem("Alarms"));
            allAlarms.forEach((item) => {
                if (item.alarmTimestamp === nearestAlarm.alarmTimestamp) {
                    item.timeoutId = id;
                }
            });
            localStorage.setItem("Alarms", JSON.stringify(allAlarms));
            setFlag(!flag);
        }
    };

    const handleEdit = (alarmId) => {
        setIsEdit(true);
        const allAlarms = JSON.parse(localStorage.getItem("Alarms")) || [];
        const oldAlarm = allAlarms.filter((item) => item.alarmId === alarmId);
        const format = localStorage.getItem("format");
        setSelectedAlarm(oldAlarm[0]);
        methods.setValue("country", JSON.stringify(oldAlarm[0].country));
        if (format === "12") {
            methods.setValue("hour", new Date(oldAlarm[0].orgTimestamp).getHours().toString() - 12);
        } else {
            methods.setValue("hour", new Date(oldAlarm[0].orgTimestamp).getHours().toString());
        }
        methods.setValue("minute", new Date(oldAlarm[0].orgTimestamp).getMinutes().toString());
        methods.setValue("ampm", new Date(oldAlarm[0].orgTimestamp).getHours() > 12 ? "PM" : "AM");
        methods.setValue("sound", oldAlarm[0].alarmTune);
        methods.setValue("volume", oldAlarm[0].alarmVolume);
        methods.setValue("alarmTitle", oldAlarm[0].title);
        methods.setValue("alarmNote", oldAlarm[0].note);
        methods.setValue("repeat", oldAlarm[0].alarmRepeat);
        if (oldAlarm[0].alarmRepeat) {
            methods.setValue("isRepeat", true);
            methods.setValue("repeat", oldAlarm[0].alarmRepeat);
        } else {
            methods.setValue("isRepeat", false);
        }
        setShowSetAlarm(true);
    };

    const handleEditAlarm = (alarmDetails) => {
        const allAlarms = JSON.parse(localStorage.getItem("Alarms")) || [];
        const newAlarms = allAlarms.filter(
            (item) => item.alarmId !== selectedAlarm?.alarmId
        );
        let editedAlarm = {
            alarmId: selectedAlarm?.alarmId,
            timeoutId: selectedAlarm?.timeoutId,
            alarmTimestamp: alarmDetails?.alarmDate?.getTime(),
            orgTimestamp: alarmDetails?.alarmDate?.getTime(),
            isAlarmPause: false,
            alarmRepeat: alarmDetails?.alarmRepeat,
            title: alarmDetails?.alarmTitle,
            note: alarmDetails?.alarmNote,
            country: alarmDetails?.country,
            alarmTune: alarmDetails?.alarmTune,
            alarmVolume: alarmDetails?.alarmVolume,
        };
        const isSnooze = "snoozeTime" in alarmDetails;
        if (isSnooze) {
            editedAlarm = { ...editedAlarm, snoozeTime: alarmDetails?.snoozeTime };
        }
        const isRepeatAlarm = "alarmRepeat" in alarmDetails;
        if (isRepeatAlarm) {
            editedAlarm = { ...editedAlarm, alarmRepeat: alarmDetails?.alarmRepeat };
        }
        newAlarms.push(editedAlarm);
        localStorage.setItem("Alarms", JSON.stringify(newAlarms));
        handleCloseAlarm();
        setFlag(!flag);
        setIsEdit(false);
    };

    return (
        <>
            <div className={styles.clock}>
                <Clock />
                <button
                    className={styles.setBtn}
                    onClick={handleSetAlarm}
                >
                    {t('common:set_alarm')}
                </button>
            </div>
            <div className={styles.divider}>
                <Divider style={{ width: '70%', minWidth: '70%' }} orientation="center" />
            </div>
            <div className={styles.alarmList}>
                <UpcomingAlarm alarmList={upcomingAlarms} />
            </div>
            <audio src={alarmAudio} ref={indexAudioRef} />
            <SetAlarmModal
                show={showSetAlarm}
                close={handleCloseAlarm}
                closeRepeat={closeRepeat}
                isEdit={isEdit}
                storeAlarm={storeAlarm}
                handleEditAlarm={handleEditAlarm}
                callToAlarm={callToAlarm}
            />
            <RingAlarmModal
                show={showRingModal}
                close={closeRingModal}
                currentAlarm={currentAlarm}
                pause={pause}
                key={'activated'}
            />
        </>
    )
}

export default Alarm;