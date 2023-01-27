import React, {useEffect, useState} from "react";
import styles from "../../styles/Reminder.module.css";
import Image from "next/image";
import TimerSvg from "../../public/Assets/svg/timer.svg"

const ReminderClock = ({ title = "Reminder Title" }) => {

    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const [currentTime, setCurrentTime] = useState();
    const [day, setDay] = useState();
    const [date, setDate] = useState();

    const updateTime = () => {
        const d = new Date();
        const format = localStorage.getItem('format');
        if(format === '24') {
            setCurrentTime(d.toLocaleString('en-US', { timeZone: localTimezone, hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }));
        } else {
            setCurrentTime(d.toLocaleString('en-US', { timeZone: localTimezone, hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }));
        }
        setDay(d.toLocaleString('en-US', { timeZone: localTimezone, weekday: 'short' }));
        setDate(d.toLocaleString('en-US', { timeZone: localTimezone, dateStyle: 'medium' }));
    };

    useEffect(() => {
        updateTime();
        setInterval(() => {
            updateTime();
        }, 1000);
    }, []);

    return (
        <div className={styles.clock}>
            <div className={styles.top}>
                <Image src={TimerSvg} alt="svg" height={25} width={25} />
                <span className={styles.title}>{title}</span>
            </div>
            <h1 className={styles.display}>
                {currentTime}
            </h1>
            <div className={styles.date}>
                <span className={styles.day}>{day}</span>
                <span className={styles.dateDiv}>{date}</span>
            </div>
        </div>
    );
};

export default ReminderClock;