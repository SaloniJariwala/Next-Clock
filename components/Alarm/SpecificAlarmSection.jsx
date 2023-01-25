import React from "react";
import {Button, Divider} from "antd";
import Image from "next/image";
import {specificTimeData} from "../../data/specificTimes";
import styles from "../../styles/Alarm.module.css";
import Ring from "../../public/Assets/svg/reminder.svg";
import { v4 as uuidv4 } from "uuid";
import {getCountryNameFromTimeZone} from "../../utils/getCountryNameFromTimeZone";

const SpecificAlarmSection = ({ storeAlarm, callToAlarm, countryData }) => {

    const handleSpecificTime = async (time) => {
        if (time < Date.now()) {
            time = time + 86400000;
        }
        const countryName = await getCountryNameFromTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
        const alarmTime = new Date(time);
        const payload = {
            alarmId: uuidv4(),
            timeoutId: "",
            country: countryData?.find((item) => item.name === countryName)._id,
            alarmTimestamp: time,
            orgTimestamp: time,
            startedTime: Date.now(),
            isAlarmPause: false,
            title: `${alarmTime.getHours()}:${alarmTime.getMinutes()}`,
            note: `Alarm set for ${alarmTime.getHours()}:${alarmTime.getMinutes()}`,
            isSpecificTime: true,
        };
        storeAlarm(payload, "specific");
        callToAlarm();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={styles.specificBar}>
                {specificTimeData.map((item, index) => (
                    <Button
                        key={index}
                        className={styles.specificBtn}
                        onClick={() => handleSpecificTime(item.value)}
                        style={{ margin: "10px" }}
                    >
                        <Image src={Ring} alt={'ring'} style={{ height: 30, width: 18 }} />
                        <Divider type={'vertical'} />
                        {item.title}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default SpecificAlarmSection;