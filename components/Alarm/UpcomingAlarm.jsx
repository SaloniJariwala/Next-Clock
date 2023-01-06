import React from 'react';
import Image from 'next/image';
import styles from "../../styles/Alarm.module.css";
import IndiaFlag from "../../public/Assets/svg/india.png";
import Ring from "../../public/Assets/svg/reminder.svg";
import AlarmSvg from "../../public/Assets/svg/alarm.svg";
import { Divider } from 'antd';
import {
    MdEdit,
    MdOutlineDeleteOutline,
    MdSettings,
    MdPauseCircleOutline,
    MdPlayCircleOutline,
} from "react-icons/md";

const UpcomingAlarm = ({ alarmList }) => {

    return (
        <>
            {
                alarmList?.map((item, index) => (
                    <div key={index} className={styles.alarm}>
                        <Image src={IndiaFlag} alt="India Flag" height={30} width={30} />{' '}
                        <span>{item.title}</span>
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
                ))
            }
        </>
    )
}

export default UpcomingAlarm;