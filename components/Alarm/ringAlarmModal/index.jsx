import React from 'react';
import { Divider, Modal } from 'antd';
import styles from "../../../styles/Alarm.module.css";
import Image from 'next/image';
import Ring from '../../../public/Assets/svg/ring.svg';
import { getCountryFlag } from '../../../utils/getCountryFlag';
import { getTime } from "../../../utils/getTime";
import Stop from "../../../public/Assets/svg/stop.svg";

const RingAlarmModal = ({
    show,
    close,
    pause,
    currentAlarm,
    callToAlarm
}) => {

    const handleRepeatAlarm = () => {
        if(currentAlarm?.alarmRepeat){
            if (currentAlarm?.alarmRepeat?.length === 1 && currentAlarm?.alarmRepeat[0] === new Date(currentAlarm?.alarmTimestamp).getDay()) {
                let d = new Date();
                const day = new Date(currentAlarm?.alarmTimestamp).getDay();
                d.setDate(d.getDate() + (((day + 7 - d.getDay()) % 7) || 7));
                const diff = d.getTime() - Date.now();
                const allAlarms = JSON.parse(localStorage.getItem('Alarms'));
                allAlarms?.forEach((item) => {
                    if (item.alarmId === currentAlarm.alarmId) {
                        item.alarmTimestamp += diff;
                    }
                });
                localStorage.setItem('Alarms', JSON.stringify(allAlarms));
                callToAlarm();
            } else {
                const next = currentAlarm?.alarmRepeat?.find((item) => item > new Date(currentAlarm?.alarmTimestamp).getDay());
                let d = new Date();
                // const day = new Date(currentAlarm?.alarmTimestamp).getDay();
                d.setDate(d.getDate() + (((next + 7 - d.getDay()) % 7) || 7));
                const diff = d.getTime() - Date.now();
                const allAlarms = JSON.parse(localStorage.getItem('Alarms'));
                allAlarms?.forEach((item) => {
                    if (item.alarmId === currentAlarm.alarmId) {
                        item.alarmTimestamp += diff;
                    }
                });
                localStorage.setItem('Alarms', JSON.stringify(allAlarms));
                callToAlarm();
            }
        }
        // if (currentAlarm.alarmRepeat?.includes('Monday')) {
        //     debugger
        //     if (new Date(currentAlarm?.alarmTimestamp).getDay() !== 1) {
        //         if (new Date(currentAlarm?.alarmTimestamp).getDay() >= 1) {
        //             debugger
        //             let d = new Date();
        //             d.setDate(d.getDate() + (((1 + 7 - d.getDay()) % 7) || 7));
        //             const diff = d.getTime() - Date.now();
        //             const allAlarms = JSON.parse(localStorage.getItem('Alarms'));
        //             allAlarms?.forEach((item) => {
        //                 if (item.alarmId === currentAlarm.alarmId) {
        //                     item.alarmTimestamp += diff;
        //                 }
        //             });
        //             localStorage.setItem('Alarms', JSON.stringify(allAlarms));
        //             callToAlarm();
        //             return;
        //         }
        //     }
        // }
        // if (currentAlarm.alarmRepeat?.includes('Tuesday')) {
        //     debugger
        //     if (new Date(currentAlarm?.alarmTimestamp).getDay() !== 2) {
        //         if (new Date(currentAlarm?.alarmTimestamp).getDay() >= 2) {
        //             debugger
        //             let d = new Date();
        //             d.setDate(d.getDate() + (((2 + 7 - d.getDay()) % 7) || 7));
        //             const diff = d.getTime() - Date.now();
        //             debugger
        //             const allAlarms = JSON.parse(localStorage.getItem('Alarms'));
        //             allAlarms?.forEach((item) => {
        //                 if (item.alarmId === currentAlarm.alarmId) {
        //                     item.alarmTimestamp += diff;
        //                     debugger
        //                 }
        //             });
        //             debugger
        //             localStorage.setItem('Alarms', JSON.stringify(allAlarms));
        //             callToAlarm();
        //             return;
        //         }

        //     }
        // }
        // if (currentAlarm.alarmRepeat?.includes('Wednesday')) {
        //     debugger
        //     if (new Date(currentAlarm?.alarmTimestamp).getDay() !== 3) {
        //         if (new Date(currentAlarm?.alarmTimestamp).getDay() < 3) {
        //             debugger
        //             let d = new Date();
        //             d.setDate(d.getDate() + (((3 + 7 - d.getDay()) % 7) || 7));
        //             const diff = d.getTime() - Date.now();
        //             debugger
        //             const allAlarms = JSON.parse(localStorage.getItem('Alarms'));
        //             allAlarms?.forEach((item) => {
        //                 if (item.alarmId === currentAlarm.alarmId) {
        //                     item.alarmTimestamp += diff;
        //                     debugger
        //                 }
        //             });
        //             debugger
        //             localStorage.setItem('Alarms', JSON.stringify(allAlarms));
        //             callToAlarm();
        //             return;
        //         }

        //     }
        // }
        // if (currentAlarm.alarmRepeat?.includes('Thursday')) {
        //     debugger
        //     if (new Date(currentAlarm?.alarmTimestamp).getDay() !== 4) {
        //         if (new Date(currentAlarm?.alarmTimestamp).getDay() < 4) {
        //             debugger
        //             let d = new Date();
        //             d.setDate(d.getDate() + (((4 + 7 - d.getDay()) % 7) || 7));
        //             const diff = d.getTime() - Date.now();
        //             const allAlarms = JSON.parse(localStorage.getItem('Alarms'));
        //             allAlarms?.forEach((item) => {
        //                 if (item.alarmId === currentAlarm.alarmId) {
        //                     item.alarmTimestamp += diff;
        //                 }
        //             });
        //             localStorage.setItem('Alarms', JSON.stringify(allAlarms));
        //             callToAlarm();
        //             return;
        //         }
        //     }
        // }
        // if (currentAlarm.alarmRepeat?.includes('Friday')) {
        //     debugger
        //     if (new Date(currentAlarm?.alarmTimestamp).getDay() !== 5) {
        //         if (new Date(currentAlarm?.alarmTimestamp).getDay() < 5) {
        //             debugger
        //             let d = new Date();
        //             d.setDate(d.getDate() + (((5 + 7 - d.getDay()) % 7) || 7));
        //             const diff = d.getTime() - Date.now();
        //             const allAlarms = JSON.parse(localStorage.getItem('Alarms'));
        //             allAlarms?.forEach((item) => {
        //                 if (item.alarmId === currentAlarm.alarmId) {
        //                     item.alarmTimestamp += diff;
        //                 }
        //             });
        //             localStorage.setItem('Alarms', JSON.stringify(allAlarms));
        //             callToAlarm();
        //             return;
        //         }
        //     }
        // }
        // if (currentAlarm.alarmRepeat?.includes('Saturday')) {
        //     debugger
        //     if (new Date(currentAlarm?.alarmTimestamp).getDay() !== 6) {
        //         if (new Date(currentAlarm?.alarmTimestamp).getDay() < 6) {
        //             debugger
        //             let d = new Date();
        //             d.setDate(d.getDate() + (((6 + 7 - d.getDay()) % 7) || 7));
        //             const diff = d.getTime() - Date.now();
        //             const allAlarms = JSON.parse(localStorage.getItem('Alarms'));
        //             allAlarms?.forEach((item) => {
        //                 if (item.alarmId === currentAlarm.alarmId) {
        //                     item.alarmTimestamp += diff;
        //                 }
        //             });
        //             localStorage.setItem('Alarms', JSON.stringify(allAlarms));
        //             callToAlarm();
        //             return;
        //         }
        //     }
        // }
        // if (currentAlarm.alarmRepeat?.includes('Sunday')) {
        //     debugger
        //     if (new Date(currentAlarm?.alarmTimestamp).getDay() !== 7) {
        //         if (new Date(currentAlarm?.alarmTimestamp).getDay() < 7) {
        //             debugger
        //             let d = new Date();
        //             d.setDate(d.getDate() + (((7 + 7 - d.getDay()) % 7) || 7));
        //             const diff = d.getTime() - Date.now();
        //             const allAlarms = JSON.parse(localStorage.getItem('Alarms'));
        //             allAlarms?.forEach((item) => {
        //                 if (item.alarmId === currentAlarm.alarmId) {
        //                     item.alarmTimestamp += diff;
        //                 }
        //             });
        //             localStorage.setItem('Alarms', JSON.stringify(allAlarms));
        //             callToAlarm();
        //             return;
        //         }
        //     }
        // }
    }


    const handleStop = () => {
        const stopTime = new Date();
        const alarms = JSON.parse(localStorage.getItem('Alarms'));
        let obj;
        alarms.forEach((item) => {
            debugger
            if(item.alarmId === currentAlarm.alarmId) {
                debugger
                obj = item;
            };
        });
        const filtered = alarms.filter((item) => item.alarmId !== obj.alarmId);
        obj = {...obj, stopTime: stopTime.getTime()};
        filtered.push(obj);
        debugger
        localStorage.setItem('Alarms', JSON.stringify(filtered));
        handleRepeatAlarm();
        pause();
        close();
    }

    return (
        <Modal
            open={show}
            onCancel={close}
            title={null}
            footer={null}
            centered
            className={styles.modal}
            width={'40%'}
        >
            <div className={styles.ringModalOuter}>
                <Image src={Ring} alt="ring-logo" height={60} width={60} />
                <Image src={getCountryFlag(currentAlarm?.country?.countryName)} alt="flag" height={50} width={50} />
                <span className={styles.ringTitle}>
                    {currentAlarm?.title}
                </span>
                <span className={styles.ringNote}>
                    {currentAlarm?.note}
                </span>
                <Divider />
                <span className={styles.ringTime}>
                    {getTime(currentAlarm?.orgTimestamp)}
                </span>
                <Divider />
                <div className={styles.ringBtnBar}>
                    <button className={styles.setBtn}>Snooze 5 min</button>
                    <button className={styles.setBtn}>Snooze 10 min</button>
                    <button className={styles.setBtn}>Snooze 15 min</button>
                </div>
                <button className={styles.setBtn} style={{ margin: '30px 0' }} onClick={handleStop}>
                    <Image src={Stop} alt={'stop'} height={20} width={20} />{' '}Stop
                </button>
            </div>
        </Modal>
    )
}

export default RingAlarmModal;