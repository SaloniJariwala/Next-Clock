import { Divider } from 'antd';
import Link from 'next/link';
import React from 'react';
import styles from "../styles/Footer.module.css";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <Divider />
            <div className={styles.innerFooter}>
                <Link href="/" className={styles.link}>Alarm Clock</Link>
                <div className={styles.saperator}></div>
                <Link href="/timer" className={styles.link}>Timer</Link>
                <div className={styles.saperator}></div>
                <Link href="/stopwatch" className={styles.link}>Stopwatch</Link>
                <div className={styles.saperator}></div>
                <Link href="/time" className={styles.link}>Time</Link>
                <div className={styles.saperator}></div>
                <Link href="/reminder" className={styles.link}>Reminder</Link>
            </div>
            <div className={styles.innerFooter}>
                <Link href="" className={styles.link}>Privacy Policy</Link>
                <div className={styles.saperator}></div>
                <Link href="" className={styles.link}>Terms of Services</Link>
                <div className={styles.saperator}></div>
                <Link href="" className={styles.link}>Cookie Policy</Link>
            </div>
            <span className={styles.copyright}>© 2022 Online Alarm. All Rights Reserved.</span>
        </div>
    )
}

export default Footer;