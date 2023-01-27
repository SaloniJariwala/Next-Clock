import React, { useEffect, useRef, useState } from 'react'
import Clock from '../Time/Clock';
import styles from "../../styles/Alarm.module.css";
import { Divider } from 'antd';
import UpcomingAlarm from './UpcomingAlarm';
import SetAlarmModal from './setAlarmModal';
import i18n from '../../i18n';
import { v4 as uuidv4 } from "uuid";
import { notifyUser } from "../../utils/notification";
import RingAlarmModal from './ringAlarmModal';
import { useForm } from 'react-hook-form';
import { getCurrentCountry } from '../../utils/getCurrentCountry';
import { audioData } from '../../data/audios';
import SpecificAlarmSection from "./SpecificAlarmSection";
import AlarmHistory from "./AlarmHistory";
import UserManual from "./userManual";

const Alarm = ({ countryData, timezoneData }) => {

    const indexAudioRef = useRef();
    const methods = useForm();

    const [country, setCountry] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [flag, setFlag] = useState(false);
    const [showSetAlarm, setShowSetAlarm] = useState(false);
    const [closeRepeat, setCloseRepeat] = useState(false);
    const [currentAlarm, setCurrentAlarm] = useState();
    const [showRingModal, setShowRingModal] = useState(false);
    const [alarmAudio, setAlarmAudio] = useState();
    const [volume, setVolume] = useState(50);
    const [selectedAlarm, setSelectedAlarm] = useState();
    const [UpcomingAlarms, setUpcomingAlarms] = useState([]);
    const [pastAlarms, setPastAlarms] = useState([]);
    const [alarmPause, setAlarmPause] = useState(false);

    useEffect(() => {
        countryData.forEach((item) => {
            if(item.value === getCurrentCountry()) {
                localStorage.setItem('country', JSON.stringify(item));
                setCountry(item);
            }
        });
    }, []);

    useEffect(() => {
        getAlarms();
        callToAlarm();
    }, []);

    useEffect(() => {
        const alarms = JSON.parse(localStorage.getItem('Alarms'));
        setUpcomingAlarms(alarms?.filter((item) => item.alarmTimestamp > Date.now()));
        setPastAlarms(alarms?.filter((item) => item.alarmTimestamp < Date.now()));
    }, [flag]);

    const play = () => {
        indexAudioRef.current?.play();
        // indexAudioRef.current?.volume = parseFloat(volume / 100);
        indexAudioRef.current.loop = true;
    };

    const pause = () => {
        indexAudioRef.current?.pause();
        setFlag(!flag);
    };

    // useEffect(() => {
    //     indexAudioRef.current.volume = volume / 100;
    // }, [volume]);

    const handleSetAlarm = () => {
        setShowSetAlarm(true);
    };

    const handleCloseAlarm = () => {
        resetForm();
        setIsEdit(false);
        setShowSetAlarm(false);
        setCloseRepeat(true);
    };

    const closeRingModal = () => {
        setShowRingModal(false);
    };

    const resetForm = () => {
        const countryValue = countryData.filter((item) => item.countryName === getCurrentCountry())[0];
        methods.setValue('country', 'selected');
        methods.setValue('timezone', 'selected');
        methods.setValue('hour', '0');
        methods.setValue('minute', '0');
        methods.setValue('volume', 50);
        methods.setValue('sound', 'selected');
        methods.setValue('alarmTitle', '');
        methods.setValue('alarmNote', '');
        methods.setValue('isRepeat', false);
        methods.setValue('repeatDays', []);
    };

    const storeAlarm = (alarmDetails, type = "") => {
        let newAlarm;
        const allAlarms = JSON.parse(localStorage.getItem("Alarms")) || [];
        if (type !== "specific") {
            newAlarm = {
                alarmId: uuidv4(),
                timeoutId: "",
                countryTimestamp: alarmDetails?.countryTimestamp,
                alarmTimestamp: alarmDetails?.alarmTimestamp,
                orgTimestamp: alarmDetails?.alarmTimestamp,
                startedTime: alarmDetails?.startedTime,
                isAlarmPause: false,
                title: alarmDetails?.alarmTitle,
                note: alarmDetails?.alarmNote,
                country: alarmDetails?.country,
                timezone: alarmDetails?.timezone,
                alarmTune: alarmDetails?.alarmTune,
                alarmVolume: alarmDetails?.alarmVolume,
            };
            const isRepeatAlarm = "alarmRepeat" in alarmDetails;
            if (isRepeatAlarm) {
                newAlarm = { ...newAlarm, alarmRepeat: alarmDetails?.alarmRepeat };
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
        audioData.forEach((item) => {
            if (item.audioId === nearestAlarm?.alarmTune) {
                setAlarmAudio(item.track);
            }
        });
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

    const deleteAlarm = (alarmId, timeoutId) => {
        let newList = JSON.parse(localStorage.getItem("Alarms")) || [];
        let delAlarm = newList.filter((item) => item.alarmId !== alarmId);
        clearTimeout(timeoutId);
        localStorage.setItem("Alarms", JSON.stringify(delAlarm));
        setFlag(!flag);
    };

    const handleEdit = (alarmId) => {
        setIsEdit(true);
        const allAlarms = JSON.parse(localStorage.getItem("Alarms")) || [];
        const oldAlarm = allAlarms.find((item) => item.alarmId === alarmId);
        const format = localStorage.getItem("format");
        setSelectedAlarm(oldAlarm);
        methods.setValue("country", oldAlarm.country);
        methods.setValue('timezone', oldAlarm.timezone);
        if (format === "12") {
            methods.setValue("hour", new Date(oldAlarm.orgTimestamp).getHours().toString() - 12);
        } else {
            methods.setValue("hour", new Date(oldAlarm.orgTimestamp).getHours().toString());
        }
        methods.setValue("minute", new Date(oldAlarm.orgTimestamp).getMinutes().toString());
        methods.setValue("ampm", new Date(oldAlarm.orgTimestamp).getHours() > 12 ? "PM" : "AM");
        methods.setValue("sound", oldAlarm.alarmTune);
        methods.setValue("volume", oldAlarm.alarmVolume);
        methods.setValue("alarmTitle", oldAlarm.title);
        methods.setValue("alarmNote", oldAlarm.note);
        if (oldAlarm.alarmRepeat) {
            methods.setValue("isRepeat", true);
            methods.setValue("repeatDays", oldAlarm.alarmRepeat);
        } else {
            methods.setValue("isRepeat", false);
        }
        setShowSetAlarm(true);
    };

    const handleEditAlarm = (alarmDetails) => {
        const allAlarms = JSON.parse(localStorage.getItem("Alarms")) || [];
        let editedAlarm = {
            alarmId: selectedAlarm?.alarmId,
            timeoutId: selectedAlarm?.timeoutId,
            alarmTimestamp: alarmDetails?.alarmTimestamp,
            orgTimestamp: alarmDetails?.alarmTimestamp,
            startedTime: selectedAlarm?.startedTime,
            isAlarmPause: false,
            alarmRepeat: alarmDetails?.alarmRepeat,
            title: alarmDetails?.alarmTitle,
            note: alarmDetails?.alarmNote,
            country: alarmDetails?.country,
            alarmTune: alarmDetails?.alarmTune,
            alarmVolume: alarmDetails?.alarmVolume,
        };
        const isRepeatAlarm = "alarmRepeat" in alarmDetails;
        if (isRepeatAlarm) {
            editedAlarm = { ...editedAlarm, alarmRepeat: alarmDetails?.alarmRepeat };
        }
        const index = allAlarms.findIndex((item) => item.alarmId === selectedAlarm?.alarmId);
        if(index !== -1) {
            allAlarms[index] = editedAlarm;
        }
        localStorage.setItem("Alarms", JSON.stringify(allAlarms));
        handleCloseAlarm();
        setFlag(!flag);
        setIsEdit(false);
    };

    const getAlarms = () => {
        setFlag(!flag);
    };

    const handlePauseAlarm = (alarm) => {
        if (!alarmPause) {
            setAlarmPause(true);
            const allAlarms = JSON.parse(localStorage.getItem("Alarms"));
            allAlarms.forEach((item) => {
                if (item.alarmTimestamp === alarm.alarmTimestamp) {
                    item.isAlarmPause = true;
                }
            });
            localStorage.setItem("Alarms", JSON.stringify(allAlarms));
            setFlag(!flag);
        } else {
            setAlarmPause(false);
            const diff = alarm.alarmTimestamp - Date.now();
            if (diff >= 0) {
                const id = setTimeout(() => {
                    notifyUser(alarm.title, alarm.note);
                    play();
                    setFlag(!flag);
                }, diff);
                const allAlarms = JSON.parse(localStorage.getItem("Alarms"));
                allAlarms.forEach((item) => {
                    if (item.alarmTimestamp === alarm.alarmTimestamp) {
                        item.timeoutId = id;
                        item.isAlarmPause = false;
                    }
                });
                localStorage.setItem("Alarms", JSON.stringify(allAlarms));
            }
            getAlarms();
        }
    };

    return (
        <div className={styles.mostOuter}>
            <div className={styles.clock}>
                <Clock timezone={Intl.DateTimeFormat().resolvedOptions().timeZone} />
                <button
                    className={styles.setBtn}
                    onClick={handleSetAlarm}
                >
                    {i18n.t('set_alarm')}
                </button>
            </div>
            <div className={styles.divider}>
                <Divider style={{ width: '70%', minWidth: '70%' }} orientation="center" />
            </div>
                <span className={styles.label}>{i18n.t('upcoming_alarms')}</span>
            <div className={styles.alarmList}>
                {UpcomingAlarms?.map((item) => (
                    <UpcomingAlarm
                        item={item}
                        key={item.alarmId}
                        deleteAlarm={deleteAlarm}
                        handleEdit={handleEdit}
                        handlePauseAlarm={handlePauseAlarm}
                        getAlarms={getAlarms}
                        play={play}
                        countryData={countryData}
                        alarmPause={alarmPause}
                    />
                ))}
            </div>
            <div className={styles.divider}>
                <Divider style={{ width: '70%', minWidth: '70%' }} orientation="center" />
            </div>
            <span className={styles.label}>{i18n.t('specific_time')}</span>
            <SpecificAlarmSection
                storeAlarm={storeAlarm}
                callToAlarm={callToAlarm}
                countryData={countryData}
            />
            <div className={styles.divider}>
                <Divider style={{ width: '70%', minWidth: '70%' }} orientation="center" />
            </div>
            <span className={styles.label}>{i18n.t('alarm_history')}</span>
            <AlarmHistory
                pastAlarms={pastAlarms}
                deleteAlarm={deleteAlarm}
                handleEdit={handleEdit}
                handlePauseAlarm={handlePauseAlarm}
                countryData={countryData}
            />
            <div className={styles.divider}>
                <Divider style={{ width: '70%', minWidth: '70%' }} orientation="center" />
            </div>
            <UserManual />
            <audio src={alarmAudio} ref={indexAudioRef} />
            <SetAlarmModal
                show={showSetAlarm}
                close={handleCloseAlarm}
                methods={methods}
                closeRepeat={closeRepeat}
                isEdit={isEdit}
                storeAlarm={storeAlarm}
                handleEditAlarm={handleEditAlarm}
                callToAlarm={callToAlarm}
                countryData={countryData}
                allTimezoneData={timezoneData}
            />
            <RingAlarmModal
                show={showRingModal}
                close={closeRingModal}
                currentAlarm={currentAlarm}
                pause={pause}
                callToAlarm={callToAlarm}
                countryData={countryData}
            />
        </div>
    )
}

export default Alarm;