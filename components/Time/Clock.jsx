import React, { useEffect, useState } from 'react';
import styles from "../../styles/Time.module.css";
import Image from "next/image";
import {getCountryNameFromTimeZone} from "../../utils/getCountryNameFromTimeZone";
import India from "../../public/Assets/flag/india.png";
import {getCountryFlag} from "../../utils/getCountryFlag";

const Clock = ({ timezone }) => {

    const [country, setCountry] = useState('');
    const [currentTime, setCurrentTime] = useState();
    const [day, setDay] = useState();
    const [date, setDate] = useState();

    const updateTime = () => {
        const d = new Date();
        const format = localStorage.getItem('format');
        if(format === '24') {
            setCurrentTime(d.toLocaleString('en-US', { timeZone: timezone, hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }));
        } else {
            setCurrentTime(d.toLocaleString('en-US', { timeZone: timezone, hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }));
        }
        setDay(d.toLocaleString('en-US', { timeZone: timezone, weekday: 'short' }));
        setDate(d.toLocaleString('en-US', { timeZone: timezone, dateStyle: 'medium' }));
    };

    const getCountry = async () => {
        const con = await getCountryNameFromTimeZone(timezone);
        setCountry(con);
    };

    useEffect(() => {
        getCountry();
        updateTime();
        const id = setInterval(() => {
            updateTime();
        }, 1000);
        return () => clearInterval(id);
    }, [timezone]);

    return (
        <>
            <div className={styles.clock}>
                <div className={styles.country}>
                    <Image src={getCountryFlag(country)} alt={'flag'} height={40} width={40} />
                    <span className={styles.title}>{country}</span>
                </div>
                <h1 className={styles.display}>
                    {currentTime}
                </h1>
                <div className={styles.date}>
                    <span className={styles.day}>{day}</span>
                    <span className={styles.dateDiv}>{date}</span>
                </div>
            </div>
        </>
    )
};

export default Clock;