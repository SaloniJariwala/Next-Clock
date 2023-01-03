import React from 'react'
import Clock from '../Clock';
import styles from "../../styles/Alarm.module.css";
import { Divider } from 'antd';
import IndiaFlag from "../../public/Assets/svg/india.png";
import Ring from "../../public/Assets/svg/reminder.svg";
import AlarmSvg from "../../public/Assets/svg/alarm.svg";
import Image from 'next/image';
import {
    MdEdit,
    MdOutlineDeleteOutline,
    MdSettings,
    MdPauseCircleOutline,
    MdPlayCircleOutline,
} from "react-icons/md";

const Alarm = () => {
    return (
        <>
            <div className={styles.clock}>
                <Clock />
            </div>
            <div className={styles.divider}>
                <Divider style={{ width: '70%', minWidth: '70%' }} orientation="center" />
            </div>
            <div className={styles.alarmList}>
                <div className={styles.alarm}>
                    <Image src={IndiaFlag} alt="India Flag" height={20} width={30} />{' '}
                    <span>Alarm Title</span>
                    <Divider style={{ margin: '10px 0' }} />
                    <span>
                        <Image src={Ring} alt="svg" height={20} width={20} />{' '}
                        00 : 02 : 04
                    </span>
                    <Divider style={{ margin: '10px 0' }} />
                    <span>
                        <Image src={AlarmSvg} alt="svg" height={20} width={20} />{' '}
                        2:00 PM
                    </span>
                    <div className={styles.btnbar}>
                        <button className={styles.btn}><MdSettings fill='grey' /></button>
                        <button className={styles.btn}><MdOutlineDeleteOutline fill='red' /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Alarm;