import React from 'react';
import styles from "../styles/Layout.module.css";
import Alarm from "../public/Assets/svg/alarm.svg";
import Timer from "../public/Assets/svg/timer.svg";
import Stopwatch from "../public/Assets/svg/stopwatch.svg";
import Time from "../public/Assets/svg/time.svg";
import Reminder from "../public/Assets/svg/reminder.svg";
import Image from 'next/image';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

const Tabs = () => {

    const { t } = useTranslation();
    const router = useRouter();

    const handleClick = (name) => {
        switch (name) {
            case 'alarm':
                router.push('/');
                break;

            case 'timer':
                router.push('/timer');
                break;

            case 'stopwatch':
                router.push('/stopwatch');
                break;

            case 'time':
                router.push('/time');
                break;

            case 'reminder':
                router.push('/reminder');
                break;

            default:
                console.log('Invalid Choice');
        }
    }

    return (
        <div className={styles.tabbar}>
            <div
                className={styles.tabs}
                style={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
                onClick={() => handleClick('alarm')}
            >
                <div className={styles.icon}>
                    <Image alt="alarm" src={Alarm} width={30} height={30} />
                </div>
                <span className={styles.tabText}>{t("common:alarm")}</span>
            </div>
            <div
                className={styles.tabs}
                onClick={() => handleClick('timer')}
            >
                <div className={styles.icon}>
                    <Image alt=""timer src={Timer} width={30} height={30} />
                </div>
                <span className={styles.tabText}>Timer</span>
            </div>
            <div
                className={styles.tabs}
                onClick={() => handleClick('stopwatch')}
            >
                <div className={styles.icon}>
                    <Image alt="stopwatch" src={Stopwatch} width={30} height={30} />
                </div>
                <span className={styles.tabText}>Stopwatch</span>
            </div>
            <div
                className={styles.tabs}
                onClick={() => handleClick('time')}
            >
                <div className={styles.icon}>
                    <Image alt="time" src={Time} width={30} height={30} />
                </div>
                <span className={styles.tabText}>Time</span>
            </div>
            <div
                className={styles.tabs}
                style={{ borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
                onClick={() => handleClick('reminder')}
            >
                <div className={styles.icon}>
                    <Image alt="reminder" src={Reminder} width={30} height={30} />
                </div>
                <span className={styles.tabText}>Reminder</span>
            </div>
        </div>
    )
}

export default Tabs;