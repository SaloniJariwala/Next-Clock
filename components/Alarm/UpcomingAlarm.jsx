import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from "../../styles/Alarm.module.css";
import Ring from "../../public/Assets/svg/reminder.svg";
import AlarmSvg from "../../public/Assets/svg/alarm.svg";
import { Divider, Popconfirm } from 'antd';
import {
    MdEdit,
    MdOutlineDeleteOutline,
    MdSettings,
    MdPause,
    MdPlayArrow,
} from "react-icons/md";
import { getCountryFlag } from "../../utils/getCountryFlag";
import { countRemaining } from '../../utils/countRemaining';
import {getCountryNameFromTimeZone} from "../../utils/getCountryNameFromTimeZone";

const UpcomingAlarm = ({
    item,
    deleteAlarm,
    handleEdit,
    handlePauseAlarm,
    countryData
}) => {

    const [showBtn, setShowBtn] = useState(false);
    const [alarmId, setAlarmId] = useState();
    const [currentTime, setCurrentTime] = useState();
    const [isInterval, setIsInterval] = useState(true);
    const [fmt, setFmt] = useState('24');
    const [localCountry, setLocalCountry] = useState();

    useEffect(() => {
        const getCountry = async () => {
            const con = await getCountryNameFromTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
            setLocalCountry(con);
        };
        getCountry();
    },[]);

    const handleAdditionBtn = (id) => {
        setAlarmId(id);
        setShowBtn(!showBtn);
    };

    const updateTime = () => {
        const time = new Date();
        clearInterval(isInterval);
        const format = localStorage.getItem("format");
        setFmt(format);
        if (format === "12") {
            setCurrentTime(
                time.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                })
            );
        } else {
            setCurrentTime(
                time.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: false,
                })
            );
        }
    };

    useEffect(() => {
        updateTime();
        setIsInterval(setInterval(updateTime, 1000));
    }, [currentTime]);

    const confirm = (alarmId, timeoutId) => {
        deleteAlarm(alarmId, timeoutId);
    };

    const handleEditing = (id) => {
        handleEdit(id);
        setShowBtn(!showBtn);
    };

    const handlePlayPause = (item) => {
        handlePauseAlarm(item);
        setShowBtn(!showBtn);
    };

    return (
        <div key={item.alarmId} className={styles.alarm}>
            <Image src={getCountryFlag(countryData?.find((i) => i._id === item.country).name)} alt="Flag" height={30} width={30} />{' '}
            <span>{item.title}</span>
            <Divider style={{ margin: '10px 0' }} />
            <span>
                <Image src={Ring} alt="svg" height={20} width={20} />{' '}
                {countRemaining(item?.alarmTimestamp)}
            </span>
            <Divider style={{ margin: '10px 0' }} />
            <span>
                <Image src={getCountryFlag(localCountry)} alt="svg" height={20} width={20} />{' '}
                {new Date(item?.orgTimestamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: fmt !== '24' })}
            </span>
            <span>
                <Image src={getCountryFlag(countryData?.find((i) => i._id === item.country).name)} alt="svg" height={20} width={20} />{' '}
                {new Date(item?.countryTimestamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: fmt !== '24' })}
            </span>
            <div className={styles.outerSetting}>
                <div className={styles.btnbar}>
                    <button className={styles.btn} onClick={() => handleAdditionBtn(item.alarmId)}><MdSettings fill='grey' /></button>
                    <Popconfirm
                        title="Delete Alarm"
                        description="Are you sure to delete this alarm?"
                        onConfirm={() => confirm(item.alarmId, item.timeoutId)}
                        onCancel={() => { return }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className={styles.btn}><MdOutlineDeleteOutline fill='red' /></button>
                    </Popconfirm>
                </div>
                {showBtn && alarmId === item.alarmId && (
                    <>
                        <button className={styles.editBtn} onClick={() => handleEditing(item.alarmId)}><MdEdit fill='grey' /></button>
                        <button className={styles.playPauseBtn} onClick={() => handlePlayPause(item)}>
                            {item.isAlarmPause ?
                                <MdPause fill='#112466' /> :
                                <MdPlayArrow fill='#112466' />
                            }
                        </button>
                    </>
                )}
            </div>
        </div >
    )
}

export default UpcomingAlarm;