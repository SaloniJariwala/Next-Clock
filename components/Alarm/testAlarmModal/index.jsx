import React, {useEffect, useRef, useState} from 'react';
import { Divider, Modal } from 'antd';
import styles from "../../../styles/Alarm.module.css";
import Image from 'next/image';
import Ring from '../../../public/Assets/svg/ring.svg';
import { getCountryFlag } from '../../../utils/getCountryFlag';
import { getTime } from "../../../utils/getTime";
import Stop from "../../../public/Assets/svg/stop.svg";
import defaultAlarmTune from "../../../Assets/audios/alarm.mp3";

const TestAlarmModal = ({
    show,
    closeModal,
    currentAlarm,
    handleStop
}) => {

    return (
        <Modal
            title={null}
            open={show}
            footer={null}
            onCancel={closeModal}
            centered
            width={'fit-content'}
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
                    <button className={styles.setBtn} style={{ marginRight: 15 }}>Snooze 5 min</button>
                    <button className={styles.setBtn} style={{ marginRight: 15 }}>Snooze 10 min</button>
                    <button className={styles.setBtn}>Snooze 15 min</button>
                </div>
                <button className={styles.setBtn} style={{ margin: '30px 0' }} onClick={handleStop}>
                    <Image src={Stop} alt={'stop'} height={20} width={20} />{' '}Stop
                </button>
            </div>
        </Modal>
    )
}

export default TestAlarmModal;