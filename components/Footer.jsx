import { Divider } from 'antd';
import Link from 'next/link';
import React from 'react';
import styles from "../styles/Footer.module.css";
import i18n from '../i18n';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <Divider />
            <div className={styles.innerFooter}>
                <Link href="/" className={styles.link}>{i18n.t('alarm')}</Link>
                <div className={styles.saperator}></div>
                <Link href="/timer" className={styles.link}>{i18n.t('timer')}</Link>
                <div className={styles.saperator}></div>
                <Link href="/stopwatch" className={styles.link}>{i18n.t('stopwatch')}</Link>
                <div className={styles.saperator}></div>
                <Link href="/time" className={styles.link}>{i18n.t('time')}</Link>
                <div className={styles.saperator}></div>
                <Link href="/reminder" className={styles.link}>{i18n.t('reminder')}</Link>
            </div>
            <div className={styles.innerFooter}>
                <Link href="/privacy-policy" className={styles.link}>{i18n.t('privacy_policy')}</Link>
                <div className={styles.saperator}></div>
                <Link href="/terms-of-services" className={styles.link}>{i18n.t('terms')}</Link>
                <div className={styles.saperator}></div>
                <Link href="/cookie-policy" className={styles.link}>{i18n.t('cookie_policy')}</Link>
            </div>
            <span className={styles.copyright}>© {i18n.t('copyright')}</span>
        </div>
    )
}

export default Footer;