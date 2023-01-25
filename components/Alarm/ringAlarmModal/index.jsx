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
    callToAlarm,
    countryData
}) => {

    const handleRepeatAlarm = () => {
        if (currentAlarm?.alarmRepeat) {
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
    };

    const handleSnooze = (snoozetime) => {
          const allAlarms = JSON.parse(localStorage.getItem('Alarms'));
          allAlarms.forEach((item) => {
              if(item.alarmId === currentAlarm?.alarmId) {
                  item.alarmTimestamp += snoozetime;
              }
          });
          localStorage.setItem('Alarms', JSON.stringify(allAlarms));
          close();
          pause();
          callToAlarm();
    };

    const handleStop = () => {
        const stopTime = new Date();
        const alarms = JSON.parse(localStorage.getItem('Alarms'));
        let obj;
        alarms.forEach((item) => {
            if(item.alarmId === currentAlarm.alarmId) {
                obj = item;
            };
        });
        const filtered = alarms.filter((item) => item.alarmId !== obj.alarmId);
        obj = {...obj, stopTime: stopTime.getTime()};
        filtered.push(obj);
        localStorage.setItem('Alarms', JSON.stringify(filtered));
        handleRepeatAlarm();
        pause();
        close();
    };

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
                <Image src={getCountryFlag(countryData?.find((i) => i._id === currentAlarm?.country)?.name)} alt="flag" height={50} width={50} />
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
                    <button className={styles.setBtn} onClick={() => handleSnooze(300000)}>Snooze 5 min</button>
                    <button className={styles.setBtn} onClick={() => handleSnooze(600000)}>Snooze 10 min</button>
                    <button className={styles.setBtn} onClick={() => handleSnooze(900000)}>Snooze 15 min</button>
                </div>
                <button className={styles.setBtn} style={{ margin: '30px 0' }} onClick={handleStop}>
                    <Image src={Stop} alt={'stop'} height={20} width={20} />{' '}Stop
                </button>
            </div>
        </Modal>
    )
}

export default RingAlarmModal;