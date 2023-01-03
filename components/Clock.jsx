import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
import styles from "../styles/Time.module.css";

const Clock = () => {

    const { t } = useTranslation();
    const [currentTime, setCurrrentTime] = useState();
    const [day, setDay] = useState();

    const updateTime = () => {
        const time = new Date();
        const format = localStorage.getItem('format');
        if (format === '12') {
            setCurrrentTime(time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }));
        } else {
            setCurrrentTime(time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }));
        }
        setDay(`${time.toLocaleString('en-US', { weekday: 'short' })} - ${time.toLocaleString('en-US', { dateStyle: 'medium' })}`)
    };

    useEffect(() => {
        updateTime();
        setInterval(updateTime, 1000);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <p className={styles.title}>{t("common:time_now")}</p>
            <div className={styles.display}>
                {currentTime}
            </div>
            <p className={styles.day}>{day}</p>
        </>
    )
}

export default Clock;